import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    title: "Unggah Gambar",
    description: "Ambil foto biji kopi Anda atau unggah gambar dari perangkat. Pastikan biji kopi terlihat jelas dan pencahayaan cukup agar deteksi lebih akurat.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    numColor: "text-orange-200",
  },
  {
    number: "02",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    title: "Proses Segmentasi AI",
    description: "Model segmentasi deep learning kami memproses setiap piksel gambar untuk mendeteksi, memisahkan, dan mengidentifikasi setiap biji kopi secara individual.",
    color: "from-stone-500 to-stone-700",
    bg: "bg-stone-100",
    border: "border-stone-300",
    numColor: "text-stone-300",
  },
  {
    number: "03",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Lihat Hasil Deteksi",
    description: "Dapatkan hasil lengkap: jenis varietas kopi yang teridentifikasi dan jumlah biji yang terdeteksi dalam gambar, beserta tingkat kepercayaan model.",
    color: "from-emerald-400 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    numColor: "text-emerald-200",
  },
];

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Deteksi Visual",
    description: "Identifikasi biji kopi langsung dari gambar tanpa perlu alat khusus.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Hitung Otomatis",
    description: "Jumlah biji kopi dihitung secara presisi oleh model segmentasi.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "3 Varietas",
    description: "Mendukung deteksi kopi Arabika, Robusta, dan Excelsa sekaligus.",
  },
];

export default function HowToUse() {
  return (
    <>
      {/* ── How To Use Section ── */}
      <section id="cara-penggunaan" className="py-20 sm:py-28 bg-color-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-color-brown-500 font-medium text-sm uppercase tracking-wider">
              Panduan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-color-brown-800 mt-4 mb-6">
              Cara Penggunaan
            </h2>
            <p className="text-color-brown-600 text-lg leading-relaxed">
              Deteksi jenis dan jumlah biji kopi Anda hanya dalam 3 langkah mudah.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-orange-200 via-stone-300 to-emerald-200" />

            {steps.map((step) => (
              <div
                key={step.number}
                className={`${step.bg} border ${step.border} rounded-2xl p-7 relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                {/* Step number watermark */}
                <span className={`absolute top-3 right-4 font-serif text-6xl font-bold select-none ${step.numColor} group-hover:scale-110 transition-transform duration-300`}>
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 text-white shadow-lg`}>
                  {step.icon}
                </div>

                <h3 className="font-serif font-bold text-color-brown-800 text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-color-brown-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/deteksi"
              className="inline-flex items-center gap-2 bg-color-brown-600 text-color-cream px-8 py-4 rounded-full font-semibold text-lg hover:bg-color-brown-700 hover:scale-105 hover:shadow-lg hover:shadow-color-brown-400/40 transition-all duration-300"
            >
              Coba Sekarang
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="py-16 bg-color-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-14 h-14 bg-color-brown-700 rounded-2xl flex items-center justify-center text-color-brown-300 group-hover:bg-color-brown-600 group-hover:text-color-cream transition-all duration-300 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-color-cream text-lg mb-1">{f.title}</h3>
                  <p className="text-color-brown-300 text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
