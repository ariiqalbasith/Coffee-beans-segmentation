const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Analisis Cerdas",
    description: "Menggunakan machine learning untuk menganalisis karakteristik kopi secara akurat.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Cepat & Efisien",
    description: "Dapatkan hasil prediksi dalam hitungan detik tanpa perlu laboratorium.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944v11.056c0 1.051-.086 2.072-.247 3.055M9 12l2 2 4-4m-5.618 4.016A11.955 11.955 0 0112 2.944v11.056c0 1.051-.086 2.072-.247 3.055M9 12l2 2 4-4m-5.618 4.016A11.955 11.955 0 0112 2.944v11.056c0 1.051-.086 2.072-.247 3.055M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Akurat & Terpercaya",
    description: "Model yang sudah dilatih dengan ribuan data untuk hasil yang dapat diandalkan.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 bg-color-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-color-brown-500 font-medium text-sm uppercase tracking-wider">
            Tentang Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-color-brown-800 mt-4 mb-6">
            Apa itu KopiPrediksi?
          </h2>
          <p className="text-color-brown-600 text-lg leading-relaxed">
            KopiPrediksi adalah platform berbasis AI yang membantu petani dan pengusaha kopi
            dalam memprediksi jenis kopi mereka. Dengan menganalisis berbagai parameter
            seperti aroma, tekstur, dan rasa, kami memberikan insight berharga untuk
            meningkatkan hasil panen dan memaksimalkan nilai jual kopi Anda.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-color-brown-50 border border-color-brown-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-color-brown-200/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-color-brown-100 rounded-xl flex items-center justify-center text-color-brown-500 mb-6">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-color-brown-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-color-brown-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
