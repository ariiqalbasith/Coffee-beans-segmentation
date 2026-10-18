"""
FastAPI backend untuk deteksi biji kopi menggunakan YOLO26n Segmentation.
Jalankan: python main.py
Server berjalan di http://localhost:8000
"""

import sys
import io
import base64
from pathlib import Path
from contextlib import asynccontextmanager

# Pastikan output konsol tidak error saat ada karakter non-ascii di Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# ── Konfigurasi ──────────────────────────────────────────────────────
MODEL_PATH = Path(__file__).parent / "models" / "bestmodel.pt"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
CONFIDENCE_THRESHOLD = 0.25

model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model YOLO saat server pertama kali berjalan."""
    global model

    if not MODEL_PATH.exists():
        print("\n" + "=" * 60)
        print("  [ERROR] MODEL TIDAK DITEMUKAN!")
        print("  Letakkan file 'bestmodel.pt' di:")
        print(f"  {MODEL_PATH.resolve()}")
        print("=" * 60 + "\n")
    else:
        try:
            from ultralytics import YOLO

            print(f"\n[INFO] Memuat model dari: {MODEL_PATH.resolve()}")
            model = YOLO(str(MODEL_PATH))

            # Warmup — jalankan inferensi sekali agar model siap
            dummy = np.zeros((640, 640, 3), dtype=np.uint8)
            model.predict(dummy, verbose=False)

            print("[SUCCESS] Model berhasil dimuat!")
            print(f"   Kelas: {model.names}")
            print(f"   Tipe : {model.task}\n")
        except Exception as e:
            print(f"\n[ERROR] Gagal memuat model: {e}\n")
            model = None

    yield


# ── Inisialisasi App ─────────────────────────────────────────────────
app = FastAPI(
    title="Coffee Bean Detection API",
    description="API deteksi biji kopi menggunakan YOLO26n Segmentation",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — izinkan Next.js frontend mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Endpoint Health Check ────────────────────────────────────────────
@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "model_loaded": model is not None,
        "model_classes": model.names if model else None,
    }


@app.get("/api/health")
async def health():
    """Detailed health check."""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_path": str(MODEL_PATH.resolve()),
        "model_classes": model.names if model else None,
    }


# ── Endpoint Deteksi Utama ───────────────────────────────────────────
@app.post("/api/detect")
async def detect(file: UploadFile = File(...)):
    """
    Menerima upload gambar, menjalankan model YOLO segmentation,
    mengembalikan hasil deteksi (bounding box, mask, label, confidence)
    beserta gambar yang sudah dianotasi.
    """
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model belum dimuat. Pastikan 'bestmodel.pt' ada di folder backend/models/",
        )

    if file.filename:
        ext = Path(file.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Format file tidak didukung. Gunakan: {', '.join(ALLOWED_EXTENSIONS)}",
            )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File terlalu besar. Maksimal {MAX_FILE_SIZE // (1024*1024)} MB.",
        )

    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="File bukan gambar yang valid.")

    # ── Jalankan Inferensi ───────────────────────────────────────────
    try:
        results = model.predict(
            source=image,
            conf=CONFIDENCE_THRESHOLD,
            verbose=False,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saat inferensi: {str(e)}")

    result = results[0]

    # ── Parsing Hasil ────────────────────────────────────────────────
    detections = []
    class_counts: dict[str, int] = {}
    total_confidence = 0.0

    if result.boxes is not None and len(result.boxes) > 0:
        boxes = result.boxes
        masks = result.masks

        for i in range(len(boxes)):
            cls_id = int(boxes.cls[i].item())
            cls_name = str(model.names[cls_id]).capitalize()
            conf = float(boxes.conf[i].item())
            bbox = boxes.xyxy[i].tolist()

            detection = {
                "class_name": cls_name,
                "class_id": cls_id,
                "confidence": round(conf, 4),
                "bbox": [round(v, 2) for v in bbox],
            }

            if masks is not None and i < len(masks):
                mask_xy = masks.xy[i]
                if len(mask_xy) > 0:
                    step = max(1, len(mask_xy) // 50)
                    simplified = mask_xy[::step].tolist()
                    detection["mask_polygon"] = [
                        [round(x, 1), round(y, 1)] for x, y in simplified
                    ]

            detections.append(detection)
            class_counts[cls_name] = class_counts.get(cls_name, 0) + 1
            total_confidence += conf

    total_beans = len(detections)
    avg_confidence = round(total_confidence / total_beans, 4) if total_beans > 0 else 0

    dominant_class = (
        max(class_counts, key=class_counts.get) if class_counts else "Tidak terdeteksi"
    )

    # ── Buat Gambar Anotasi ──────────────────────────────────────────
    annotated_b64 = None
    try:
        annotated_array = result.plot()
        annotated_img = Image.fromarray(annotated_array[..., ::-1])

        max_dim = 1280
        if max(annotated_img.size) > max_dim:
            annotated_img.thumbnail((max_dim, max_dim), Image.LANCZOS)

        buffer = io.BytesIO()
        annotated_img.save(buffer, format="JPEG", quality=85)
        annotated_b64 = (
            "data:image/jpeg;base64," + base64.b64encode(buffer.getvalue()).decode()
        )
    except Exception as e:
        print(f"[WARN] Gagal membuat gambar anotasi: {e}")

    # Detail distribusi per kelas
    detail_biji = []
    for cls_name, count in sorted(
        class_counts.items(), key=lambda x: x[1], reverse=True
    ):
        persen = round((count / total_beans) * 100) if total_beans > 0 else 0
        detail_biji.append({
            "label": cls_name,
            "jumlah": count,
            "persen": persen,
        })

    return JSONResponse(content={
        "success": True,
        "detections": detections,
        "summary": {
            "total_beans": total_beans,
            "avg_confidence": avg_confidence,
            "class_counts": class_counts,
            "dominant_class": dominant_class,
            "detail_biji": detail_biji,
        },
        "annotated_image": annotated_b64,
    })


# ── Jalankan Server ──────────────────────────────────────────────────
if __name__ == "__main__":
    print("\nCoffee Bean Detection API")
    print("=" * 40)
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )
