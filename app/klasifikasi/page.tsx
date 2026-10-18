"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { ImageUp, FileImage, ScanSearch, RotateCcw } from "lucide-react";

interface KlasifikasiResult {
  id: string;
  image: string;
  jenisKopi: string;
  confidence: number;
  timestamp: string;
}

export default function Klasifikasi() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockKlasifikasi = async () => {
    setIsClassifying(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const jenisKopi = ["Arabica", "Robusta", "Liberica", "Excelsa"];
    const randomIndex = Math.floor(Math.random() * jenisKopi.length);
    const confidence = Math.floor(Math.random() * 30) + 70;

    const resultData: KlasifikasiResult = {
      id: Date.now().toString(),
      image: selectedImage!,
      jenisKopi: jenisKopi[randomIndex],
      confidence,
      timestamp: new Date().toISOString(),
    };

    const existingHistory = localStorage.getItem("klasifikasiHistory");
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    history.unshift(resultData);
    localStorage.setItem("klasifikasiHistory", JSON.stringify(history));
    localStorage.setItem("klasifikasiResult", JSON.stringify(resultData));

    router.push("/hasil");
    setIsClassifying(false);
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
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    } else {
      setError("Hanya file gambar yang diizinkan (JPG, PNG, WEBP)");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file terlalu besar. Maksimal 5MB.");
      return;
    }
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setFileName("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <div className="p-4 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6 shadow-sm">
          <div>
            <h2 className="text-stone-800 text-xl font-bold">Klasifikasi Kopi</h2>
            <p className="text-stone-500 text-sm mt-0.5">
              Unggah gambar untuk mengidentifikasi jenis kopi
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ── Upload Section ── */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-stone-700 font-semibold mb-4 flex items-center gap-2">
              <ImageUp className="w-5 h-5 text-amber-600" />
              Unggah Gambar
            </h3>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                isDragging
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-300 hover:border-amber-400 hover:bg-amber-50/50"
              }`}
            >
              {selectedImage ? (
                <div className="relative">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedImage}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 inline-flex items-center gap-1.5 text-stone-500 hover:text-red-600 text-sm font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Hapus gambar
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                    <FileImage className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-stone-700 font-medium mb-1">
                    Drag & drop gambar di sini
                  </p>
                  <p className="text-stone-400 text-sm mb-4">atau</p>
                  <label className="inline-block cursor-pointer">
                    <span
                      className="text-white px-6 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                      style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}
                    >
                      Pilih File
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                  <p className="text-stone-400 text-xs mt-4">
                    JPG, PNG, WEBP • Maksimal 5MB
                  </p>
                </>
              )}
            </div>

            {fileName && (
              <p className="text-stone-500 text-sm mt-3 truncate">
                📎 {fileName}
              </p>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Classify Button */}
            <button
              onClick={() => selectedImage && mockKlasifikasi()}
              disabled={!selectedImage || isClassifying}
              className="w-full mt-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={
                selectedImage && !isClassifying
                  ? { background: "linear-gradient(135deg, #8B5A2B, #6B4423)", color: "white" }
                  : { background: "#e7e5e4", color: "#a8a29e", cursor: "not-allowed" }
              }
            >
              {isClassifying ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Mengklasifikasi...
                </>
              ) : (
                <>
                  <ScanSearch className="w-5 h-5" />
                  Klasifikasi Sekarang
                </>
              )}
            </button>
          </div>

          {/* ── Result Placeholder Section ── */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-stone-700 font-semibold mb-4 flex items-center gap-2">
              <ScanSearch className="w-5 h-5 text-amber-600" />
              Hasil Klasifikasi
            </h3>

            <div className="border-2 border-stone-100 rounded-xl p-8 text-center min-h-[320px] flex flex-col items-center justify-center bg-stone-50">
              <div className="w-20 h-20 mx-auto mb-4 bg-stone-100 rounded-full flex items-center justify-center">
                <FileImage className="w-10 h-10 text-stone-300" />
              </div>
              <p className="text-stone-500 font-medium">
                Hasil akan muncul di halaman berikutnya
              </p>
              <p className="text-stone-400 text-sm mt-1">
                setelah proses klasifikasi selesai
              </p>
            </div>

            <Link
              href="/hasil"
              className="block w-full mt-4 py-2.5 text-center text-stone-600 hover:text-amber-700 text-sm font-medium border border-stone-200 rounded-lg hover:bg-amber-50 hover:border-amber-200 transition-colors"
            >
              📊 Lihat Hasil Klasifikasi Sebelumnya
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
