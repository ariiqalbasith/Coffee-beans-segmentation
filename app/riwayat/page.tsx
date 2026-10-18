"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { Eye, Trash2, ClipboardList, ScanSearch } from "lucide-react";

interface KlasifikasiResult {
  id: string;
  image: string;
  jenisKopi: string;
  confidence: number;
  timestamp: string;
}

export default function Riwayat() {
  const [results, setResults] = useState<KlasifikasiResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem("klasifikasiHistory");
    if (savedResults) setResults(JSON.parse(savedResults));
    setLoading(false);
  }, []);

  const handleHapus = (id: string) => {
    const updated = results.filter((r) => r.id !== id);
    setResults(updated);
    localStorage.setItem("klasifikasiHistory", JSON.stringify(updated));
  };

  const handleHapusSemua = () => {
    setResults([]);
    localStorage.removeItem("klasifikasiHistory");
  };

  const formatTanggal = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  /** Confidence color — semua pakai Tailwind standard, bukan color-brown */
  const getConfidencePill = (confidence: number) => {
    if (confidence >= 90)
      return { bg: "bg-emerald-100", text: "text-emerald-700", label: "Tinggi" };
    if (confidence >= 70)
      return { bg: "bg-amber-100", text: "text-amber-700", label: "Sedang" };
    return { bg: "bg-red-100", text: "text-red-600", label: "Rendah" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex">
        <div className="p-4 shrink-0">
          <Sidebar />
        </div>
        <main className="flex-1 p-6 flex items-center justify-center">
          <p className="text-stone-500 font-medium">Memuat...</p>
        </main>
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
              <ClipboardList className="w-5 h-5 text-amber-600" />
              Riwayat Klasifikasi
            </h2>
            <p className="text-stone-500 text-sm mt-0.5">
              {results.length} klasifikasi tersimpan
            </p>
          </div>
          {results.length > 0 && (
            <button
              onClick={handleHapusSemua}
              className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-medium border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid gap-3">
            {results.map((result) => {
              const pill = getConfidencePill(result.confidence);
              return (
                <div
                  key={result.id}
                  className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                    <Image
                      src={result.image}
                      alt={`Hasil ${result.jenisKopi}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">☕</span>
                      <h3 className="text-stone-800 font-bold text-lg">
                        {result.jenisKopi}
                      </h3>
                    </div>
                    <p className="text-stone-400 text-sm truncate">
                      {formatTanggal(result.timestamp)}
                    </p>
                  </div>

                  {/* Confidence */}
                  <div className="text-center px-3">
                    <div className={`px-3 py-1 rounded-full ${pill.bg} mb-1`}>
                      <span className={`font-bold text-sm ${pill.text}`}>
                        {result.confidence}%
                      </span>
                    </div>
                    <p className={`text-xs font-medium ${pill.text}`}>{pill.label}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <Link
                      href="/hasil"
                      className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleHapus(result.id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
              <ClipboardList className="w-12 h-12 text-stone-300" />
            </div>
            <h3 className="text-stone-700 text-xl font-semibold mb-2">
              Belum Ada Riwayat Klasifikasi
            </h3>
            <p className="text-stone-500 mb-6 max-w-sm mx-auto">
              Hasil klasifikasi Anda akan muncul di sini setelah Anda melakukan analisis kopi.
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
