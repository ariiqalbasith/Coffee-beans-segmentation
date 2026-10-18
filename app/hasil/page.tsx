"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { FileText, RotateCcw, Trash2, ScanSearch, Coffee } from "lucide-react";

interface KlasifikasiResult {
  id: string;
  image: string;
  jenisKopi: string;
  confidence: number;
  timestamp: string;
}

export default function Hasil() {
  const router = useRouter();
  const [result, setResult] = useState<KlasifikasiResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResult = localStorage.getItem("klasifikasiResult");
    if (savedResult) setResult(JSON.parse(savedResult));
    setLoading(false);
  }, []);

  const handleKlasifikasiUlang = () => router.push("/klasifikasi");

  const handleHapusRiwayat = () => {
    localStorage.removeItem("klasifikasiResult");
    setResult(null);
  };

  /** Progress bar color by confidence */
  const getBarColor = (c: number) =>
    c >= 90 ? "#059669" : c >= 70 ? "#d97706" : "#dc2626";

  const getConfidenceLabel = (c: number) =>
    c >= 90
      ? { text: "Sangat Tinggi", textClass: "text-emerald-700", bgClass: "bg-emerald-100" }
      : c >= 70
      ? { text: "Tinggi", textClass: "text-amber-700", bgClass: "bg-amber-100" }
      : { text: "Moderat", textClass: "text-red-600", bgClass: "bg-red-100" };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-500 font-medium">Memuat...</p>
      </div>
    );
  }

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
            <h2 className="text-stone-800 text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              Hasil Klasifikasi
            </h2>
            <p className="text-stone-500 text-sm mt-0.5">
              Detail hasil identifikasi jenis kopi
            </p>
          </div>
        </div>

        {result ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-stone-700 font-semibold mb-4 flex items-center gap-2">
                <ScanSearch className="w-4 h-4 text-amber-600" />
                Gambar yang Dianalisis
              </h3>
              <div className="relative w-full h-80 bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                <Image
                  src={result.image}
                  alt="Gambar kopi yang dianalisis"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-stone-400 text-sm mt-3 text-center">
                Diunggah pada {new Date(result.timestamp).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Result Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-stone-700 font-semibold mb-4 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-600" />
                Hasil Prediksi
              </h3>

              {/* Main Result */}
              <div className="text-center py-8 border-2 border-stone-100 rounded-xl mb-6 bg-stone-50">
                <div
                  className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #A67B5B, #6B4423)" }}
                >
                  <span className="text-4xl">☕</span>
                </div>
                <p className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-2">
                  Jenis Kopi Teridentifikasi
                </p>
                <p className="text-stone-800 text-4xl font-bold font-serif mb-2">
                  {result.jenisKopi}
                </p>
                <p className="text-stone-500 text-sm">
                  Berdasarkan analisis gambar yang diunggah
                </p>
              </div>

              {/* Confidence Score */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-stone-600 font-medium text-sm">Confidence Score</p>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${getConfidenceLabel(result.confidence).bgClass} ${getConfidenceLabel(result.confidence).textClass}`}
                  >
                    {getConfidenceLabel(result.confidence).text}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-stone-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${result.confidence}%`,
                        background: `linear-gradient(90deg, ${getBarColor(result.confidence)}, ${getBarColor(result.confidence)}cc)`,
                      }}
                    />
                  </div>
                  <span className="text-stone-800 font-bold text-sm w-10 text-right">
                    {result.confidence}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleKlasifikasiUlang}
                  className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Klasifikasi Ulang
                </button>
                <button
                  onClick={handleHapusRiwayat}
                  className="w-full border-2 border-stone-200 text-stone-600 py-3 rounded-lg font-medium hover:bg-stone-50 hover:border-stone-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus Hasil Ini
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-stone-300" />
            </div>
            <h3 className="text-stone-700 text-xl font-semibold mb-2">
              Belum Ada Hasil Klasifikasi
            </h3>
            <p className="text-stone-500 mb-6 max-w-sm mx-auto">
              Silakan lakukan klasifikasi terlebih dahulu untuk melihat hasilnya di sini.
            </p>
            <Link
              href="/klasifikasi"
              className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}
            >
              <ScanSearch className="w-5 h-5" />
              Mulai Klasifikasi
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
