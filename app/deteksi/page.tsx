"use client";

import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE_URL = "http://localhost:8000";

interface DetectionResult {
  jenisKopi: string;
  jumlahBiji: number;
  confidence: number;
  detailBiji: { label: string; jumlah: number; persen: number }[];
  annotatedImage?: string;
}

export default function DeteksiPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /* ── Kamera Stream Handler ── */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async (facingMode: "environment" | "user" = cameraFacing) => {
    stopCamera();
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error(err);
      setError("Gagal mengakses kamera. Pastikan izin kamera telah diizinkan di browser.");
      setIsCameraActive(false);
    }
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  const capturePhoto = (autoDetect = true) => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setSelectedImage(dataUrl);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `live-kamera-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        setSelectedFile(file);
        setFileName(file.name);
        stopCamera();
        if (autoDetect) {
          executeDetection(file);
        }
      }
    }, "image/jpeg", 0.9);
  };

  /* ── Deteksi via FastAPI Backend ── */
  const executeDetection = async (fileToDetect: File) => {
    setIsProcessing(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", fileToDetect);

      const response = await fetch(`${API_BASE_URL}/api/detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(
          errData?.detail || `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Deteksi gagal. Coba lagi dengan gambar lain.");
      }

      const { summary, annotated_image } = data;

      setResult({
        jenisKopi: summary.dominant_class,
        jumlahBiji: summary.total_beans,
        confidence: Math.round(summary.avg_confidence * 100),
        detailBiji: summary.detail_biji,
        annotatedImage: annotated_image || undefined,
      });
    } catch (err) {
      const message =
        err instanceof TypeError && err.message.includes("fetch")
          ? "Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8000"
          : err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mendeteksi.";
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const runDetection = () => {
    if (selectedFile) {
      executeDetection(selectedFile);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diizinkan (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file terlalu besar. Maksimal 10 MB.");
      return;
    }
    setError(null);
    setResult(null);
    setSelectedFile(file);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    stopCamera();
    setSelectedImage(null);
    setSelectedFile(null);
    setFileName("");
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getConfidenceColor = (c: number) =>
    c >= 90 ? "#059669" : c >= 75 ? "#d97706" : "#dc2626";

  const varietyEmoji: Record<string, string> = {
    Arabika: "☕",
    Robusta: "⚡",
    Excelsa: "🌿",
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-color-cream to-color-brown-50 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Header ── */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-color-brown-100 border border-color-brown-200 rounded-full px-4 py-1.5 text-color-brown-600 text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Model Segmentasi Aktif
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-color-brown-800 mb-3">
              Deteksi Biji Kopi
            </h1>
            <p className="text-color-brown-600 max-w-lg mx-auto leading-relaxed">
              Unggah file atau ambil <strong>foto langsung dari kamera</strong> — model AI akan mendeteksi <strong>jenis varietas</strong> dan{" "}
              <strong>jumlah biji</strong> secara otomatis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* ── Upload & Camera Panel ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-color-brown-100 p-6 flex flex-col">
              {/* Tab Selector */}
              <div className="flex bg-stone-100 p-1 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("upload");
                    stopCamera();
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === "upload"
                      ? "bg-white text-color-brown-800 shadow-sm font-semibold"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Unggah Gambar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("camera");
                    if (!selectedImage) {
                      startCamera();
                    }
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === "camera"
                      ? "bg-white text-color-brown-800 shadow-sm font-semibold"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Kamera
                </button>
              </div>

              {/* Mode: Kamera Langsung */}
              {activeTab === "camera" && (
                <div className="flex-1 flex flex-col">
                  {selectedImage ? (
                    <div className="relative w-full h-72 rounded-xl overflow-hidden bg-black/5 border border-color-brown-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result?.annotatedImage || selectedImage}
                        alt="Hasil foto biji kopi"
                        className="w-full h-full object-contain"
                      />
                      {result?.annotatedImage && (
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <span className="bg-emerald-800/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-medium">
                            ✓ Hasil Segmentasi Model
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full h-72 rounded-xl overflow-hidden bg-stone-900 flex items-center justify-center border border-stone-800">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${!isCameraActive ? "hidden" : ""}`}
                      />
                      {!isCameraActive ? (
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-3 bg-stone-800 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-stone-300 font-medium mb-3">Kamera Belum Aktif</p>
                          <button
                            type="button"
                            onClick={() => startCamera()}
                            className="px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-all"
                            style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}
                          >
                            Aktifkan Kamera
                          </button>
                        </div>
                      ) : (
                        /* Overlay frame penunjuk posisi biji kopi */
                        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                          <div className="flex justify-end items-center pointer-events-auto">
                            <button
                              type="button"
                              onClick={toggleCameraFacing}
                              title="Ganti Kamera (Depan / Belakang)"
                              className="bg-black/60 hover:bg-black/80 text-white px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <span>Ganti Kamera</span>
                            </button>
                          </div>
                          <div className="border border-white/30 border-dashed rounded-lg mx-6 h-36 flex items-center justify-center">
                            <p className="text-white/70 text-xs bg-black/40 px-2 py-1 rounded">Posisikan biji kopi di area ini</p>
                          </div>
                          <div />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Kontrol Kamera */}
                  <div className="mt-4 flex gap-2">
                    {isCameraActive && !selectedImage && (
                      <button
                        type="button"
                        onClick={() => capturePhoto(true)}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Ambil Foto & Deteksi Langsung
                      </button>
                    )}

                    {selectedImage && (
                      <button
                        type="button"
                        onClick={() => {
                          handleReset();
                          startCamera();
                        }}
                        className="flex-1 py-3 rounded-xl border border-color-brown-300 text-color-brown-700 font-semibold text-sm hover:bg-color-brown-50 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                        Buka Kamera Lagi
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Mode: Unggah Gambar (File Upload) */}
              {activeTab === "upload" && (
                <div>
                  {/* Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !selectedImage && fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                      isDragging
                        ? "border-color-brown-500 bg-color-brown-50 scale-[1.01]"
                        : selectedImage
                        ? "border-color-brown-300 bg-color-brown-50"
                        : "border-color-brown-200 hover:border-color-brown-400 hover:bg-color-brown-50 cursor-pointer"
                    }`}
                  >
                    {selectedImage ? (
                      <div className="p-4">
                        <div className="relative w-full h-72 rounded-lg overflow-hidden bg-color-brown-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={result?.annotatedImage || selectedImage}
                            alt="Gambar biji kopi yang akan dideteksi"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {result?.annotatedImage && (
                          <p className="text-xs text-emerald-600 font-medium mt-2 text-center flex items-center justify-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Hasil segmentasi model
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-10 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-color-brown-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-color-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-color-brown-700 font-medium mb-1">
                          Drag & drop gambar di sini
                        </p>
                        <p className="text-color-brown-400 text-sm mb-4">atau klik untuk memilih file</p>
                        <span className="inline-block text-white px-6 py-2 rounded-lg font-medium text-sm" style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}>
                          Pilih File
                        </span>
                        <p className="text-color-brown-400 text-xs mt-4">JPG, PNG, WEBP · Maks 10 MB</p>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
                    className="hidden"
                  />

                  {/* File name */}
                  {fileName && (
                    <p className="text-color-brown-500 text-sm mt-3 flex items-center gap-1.5 truncate">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {fileName}
                    </p>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Action Buttons for Upload Tab */}
              {activeTab === "upload" && (
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={runDetection}
                    disabled={!selectedFile || isProcessing}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                    style={
                      selectedFile && !isProcessing
                        ? { background: "linear-gradient(135deg, #8B5A2B, #6B4423)", color: "white" }
                        : { background: "#e7e5e4", color: "#a8a29e", cursor: "not-allowed" }
                    }
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Mendeteksi...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Deteksi Sekarang
                      </>
                    )}
                  </button>
                  {selectedImage && (
                    <button
                      onClick={handleReset}
                      className="px-4 py-3 rounded-xl border-2 border-stone-200 text-stone-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      title="Reset"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── Result Panel ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-color-brown-100 p-6">
              <h2 className="text-color-brown-800 font-semibold text-lg mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-color-brown-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Hasil Deteksi
              </h2>

              {isProcessing ? (
                /* Loading State */
                <div className="flex flex-col items-center justify-center h-72 gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-color-brown-200 rounded-full" />
                    <div className="absolute inset-0 w-20 h-20 border-4 border-color-brown-500 border-t-transparent rounded-full animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center text-2xl">☕</span>
                  </div>
                  <div className="text-center">
                    <p className="text-color-brown-700 font-semibold">Segmentasi berjalan...</p>
                    <p className="text-color-brown-400 text-sm mt-1">Model sedang menganalisis gambar</p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full max-w-xs bg-stone-200 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full rounded-full animate-pulse" style={{ width: "70%", background: "linear-gradient(90deg, #8B5A2B, #6B4423)" }} />
                  </div>
                </div>
              ) : result ? (
                /* Result State */
                <div className="space-y-5">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-color-brown-50 border border-color-brown-100 rounded-xl p-4 text-center">
                      <p className="text-color-brown-400 text-xs uppercase tracking-wide font-medium mb-1">Total Biji</p>
                      <p className="font-serif text-4xl font-bold text-color-brown-700">{result.jumlahBiji}</p>
                      <p className="text-color-brown-400 text-xs mt-0.5">biji terdeteksi</p>
                    </div>
                    <div className="bg-color-brown-50 border border-color-brown-100 rounded-xl p-4 text-center">
                      <p className="text-color-brown-400 text-xs uppercase tracking-wide font-medium mb-2">Confidence</p>
                      <p className="font-serif text-4xl font-bold" style={{ color: getConfidenceColor(result.confidence) }}>
                        {result.confidence}%
                      </p>
                      <div className="mt-2 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${result.confidence}%`, background: getConfidenceColor(result.confidence) }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Breakdown per variety */}
                  <div>
                    <p className="text-color-brown-700 text-sm font-semibold mb-3">Distribusi Varietas</p>
                    {result.jumlahBiji === 0 ? (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
                        <p className="text-amber-800 font-semibold text-sm">Tidak ada biji kopi terdeteksi</p>
                        <p className="text-amber-700 text-xs mt-1">
                          Model tidak menemukan objek yang cocok dengan karakteristik biji kopi pada gambar ini.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {result.detailBiji.map((d) => (
                          <div
                            key={d.label}
                            className="flex items-center justify-between p-3.5 bg-color-brown-50/70 border border-color-brown-100 rounded-xl hover:bg-color-brown-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{varietyEmoji[d.label] || "☕"}</span>
                              <span className="font-semibold text-color-brown-800 text-sm">{d.label}</span>
                            </div>
                            <span className="px-3 py-1 bg-white border border-color-brown-200 text-color-brown-700 rounded-full text-xs font-bold shadow-2xs">
                              {d.jumlah} biji
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Detect again */}
                  <button
                    onClick={handleReset}
                    className="w-full py-3 rounded-xl border-2 border-color-brown-200 text-color-brown-600 font-medium text-sm hover:bg-color-brown-50 hover:border-color-brown-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Deteksi Gambar Baru
                  </button>
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-72 text-center">
                  <div className="w-24 h-24 mx-auto mb-5 bg-color-brown-50 rounded-full flex items-center justify-center border-2 border-dashed border-color-brown-200">
                    <svg className="w-10 h-10 text-color-brown-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-color-brown-600 font-semibold mb-1">Belum ada hasil</p>
                  <p className="text-color-brown-400 text-sm">
                    Unggah gambar lalu tekan{" "}
                    <span className="font-medium text-color-brown-600">Deteksi Sekarang</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Info Banner ── */}
          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-emerald-800 font-semibold text-sm mb-1">Model YOLO26n Segmentation</p>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Halaman ini terhubung ke model YOLO26n Segmentation melalui backend API.{" "}
                Pastikan server backend berjalan di{" "}
                <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono text-xs">http://localhost:8000</code>{" "}
                sebelum menjalankan deteksi.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
