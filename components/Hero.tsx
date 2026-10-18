import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-color-cream via-color-brown-50 to-color-brown-100 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-color-brown-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-color-brown-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-color-brown-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-color-brown-100 border border-color-brown-200 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-color-brown-600 font-medium">
                AI-Powered Coffee Bean Detection
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-color-brown-800 leading-tight mb-6">
              Deteksi Jenis &{" "}
              <br />
              <span className="text-color-brown-500">Jumlah Biji Kopi</span>{" "}
              Anda
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-color-brown-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Unggah satu gambar, dapatkan hasil deteksi jenis kopi{" "}
              <strong>sekaligus hitungan jumlah biji</strong> secara otomatis
              menggunakan model segmentasi AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14">
              <Link
                id="btn-mulai-deteksi"
                href="/deteksi"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-color-dark text-color-brown-800 px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_25px_rgba(74,44,23,0.6)] hover:shadow-[0_0_40px_rgba(74,44,23,0.8)] hover:bg-color-brown-800 hover:scale-105 transition-all duration-300 animate-[subtle-glow_2s_ease-in-out_infinite]"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Mulai Deteksi
              </Link>
              <a
                id="btn-cara-penggunaan"
                href="#cara-penggunaan"
                className="w-full sm:w-auto border-2 border-color-brown-300 text-color-brown-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-color-brown-100 hover:border-color-brown-400 transition-all duration-300"
              >
                Cara Penggunaan ↓
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-serif text-3xl font-bold text-color-brown-700">3</p>
                <p className="text-sm text-color-brown-500 mt-1">Varietas Kopi</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-3xl font-bold text-color-brown-700">AI</p>
                <p className="text-sm text-color-brown-500 mt-1">Segmentasi</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-3xl font-bold text-color-brown-700">Real-time</p>
                <p className="text-sm text-color-brown-500 mt-1">Deteksi</p>
              </div>
            </div>
          </div>

          {/* ── Right: Coffee Beans Image ── */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute inset-0 m-auto w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-color-brown-300/40 to-color-brown-500/20 blur-2xl" />

            {/* Image container */}
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full overflow-hidden border-4 border-color-brown-200 shadow-2xl shadow-color-brown-400/30">
              <Image
                src="/coffee-beans-hero.png"
                alt="Biji kopi premium untuk deteksi AI"
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 460px"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Floating badge: Segmentasi */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-0 bg-color-cream/90 backdrop-blur-sm border border-color-brown-200 rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs text-color-brown-500 font-medium uppercase tracking-wide">Model</p>
              <p className="font-serif font-bold text-color-brown-800 text-sm mt-0.5">Segmentasi AI</p>
            </div>

            {/* Floating badge: Deteksi */}
            <div className="absolute bottom-10 left-0 sm:-left-4 bg-color-brown-600/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs text-color-brown-200 font-medium uppercase tracking-wide">Mendeteksi</p>
              <p className="font-serif font-bold text-color-cream text-sm mt-0.5">Jenis & Jumlah Biji</p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-color-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
