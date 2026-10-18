export default function CTA() {
  return (
    <section id="cta" className="py-20 sm:py-32 bg-gradient-to-br from-color-brown-600 via-color-brown-700 to-color-brown-800 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(253,246,227,0.3)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(253,246,227,0.2)_0%,_transparent_40%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-color-brown-200 font-medium text-sm uppercase tracking-wider">
          Siap Memulai?
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-color-cream mt-4 mb-6">
          Kenali Jenis Kopi Anda Sekarang
        </h2>
        <p className="text-color-brown-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Bergabung dengan ribuan petani dan pengusaha kopi yang sudah menggunakan
          KopiPrediksi untuk mengidentifikasi jenis kopi mereka. Mulai gratis hari ini!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="btn-cta-prediksi"
            href="/klasifikasi"
            className="w-full sm:w-auto bg-color-cream text-color-brown-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-color-brown-50 transition-all duration-300 hover:shadow-xl"
          >
            Mulai Prediksi Sekarang
          </a>
          <a
            id="btn-cta-pelajari"
            href="#about"
            className="w-full sm:w-auto border-2 border-color-brown-300 text-color-cream px-8 py-4 rounded-full font-semibold text-lg hover:bg-color-brown-600 transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-color-brown-200">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Tanpa Kartu Kredit</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Gratis 10 Analisis</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Data Aman & Privasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
