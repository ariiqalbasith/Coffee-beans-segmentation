import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  { emoji: "🧑‍💻", name: "Pengembang", role: "AI & Machine Learning Engineer" },
  { emoji: "☕", name: "Domain Expert", role: "Coffee Industry Specialist" },
  { emoji: "🎨", name: "UI/UX Designer", role: "Interface & Experience Design" },
];

const timeline = [
  {
    year: "Awal",
    title: "Identifikasi Masalah",
    description:
      "Petani dan pelaku industri kopi kesulitan mengidentifikasi jenis biji kopi secara cepat tanpa uji laboratorium yang memakan waktu dan biaya.",
    icon: "🔍",
  },
  {
    year: "Riset",
    title: "Pengumpulan Data",
    description:
      "Pengumpulan ribuan citra biji kopi dari berbagai varietas untuk membangun dataset pelatihan model segmentasi.",
    icon: "📊",
  },
  {
    year: "Develop",
    title: "Pelatihan Model AI",
    description:
      "Melatih model segmentasi instance untuk mendeteksi, menghitung, dan mengklasifikasikan biji kopi secara bersamaan dalam satu gambar.",
    icon: "🤖",
  },
  {
    year: "Sekarang",
    title: "Aplikasi Web",
    description:
      "Mengemas model AI ke dalam aplikasi web yang mudah diakses oleh siapa saja, dari petani hingga peneliti.",
    icon: "🌐",
  },
];

const problems = [
  {
    icon: "⏱️",
    title: "Identifikasi Manual Lambat",
    description:
      "Proses identifikasi manual membutuhkan waktu lama dan tenaga ahli berpengalaman yang tidak selalu tersedia di lapangan.",
  },
  {
    icon: "💰",
    title: "Biaya Laboratorium Tinggi",
    description:
      "Pengujian di laboratorium memerlukan biaya yang tidak sedikit, sehingga sulit dijangkau oleh petani kopi skala kecil.",
  },
  {
    icon: "📉",
    title: "Potensi Kesalahan Tinggi",
    description:
      "Identifikasi berbasis visual manusia rentan terhadap kesalahan, terutama untuk membedakan varietas yang mirip seperti Arabika dan Excelsa.",
  },
  {
    icon: "🔢",
    title: "Penghitungan Manual Tidak Efisien",
    description:
      "Menghitung jumlah biji kopi secara manual dalam jumlah besar sangat tidak efisien dan rawan kesalahan.",
  },
];

const techStack = [
  { name: "Model Segmentasi", desc: "Instance segmentation untuk deteksi per-biji", icon: "🧠" },
  { name: "Next.js", desc: "Framework frontend modern berbasis React", icon: "⚡" },
  { name: "Computer Vision", desc: "Analisis visual berbasis deep learning", icon: "👁️" },
  { name: "REST API", desc: "Antarmuka integrasi model dengan frontend", icon: "🔗" },
];

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-color-cream to-color-brown-50 pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Hero Banner ── */}
          <div
            className="rounded-3xl p-10 mb-12 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #4A2C17 0%, #6B4423 50%, #8B5A2B 100%)" }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full translate-y-1/3 -translate-x-1/3" />
            </div>
            <div className="relative z-10">
              <span className="text-5xl block mb-4">🫘</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                Tentang CoffeeLens
              </h1>
              <p className="text-amber-200 text-lg max-w-2xl mx-auto leading-relaxed">
                Aplikasi deteksi biji kopi berbasis kecerdasan buatan yang membantu petani,
                peneliti, dan pelaku industri mengidentifikasi varietas dan menghitung jumlah biji
                secara akurat dari satu gambar.
              </p>
            </div>
          </div>

          {/* ── Latar Belakang ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-color-brown-500" />
              <h2 className="font-serif text-2xl font-bold text-color-brown-800">Latar Belakang</h2>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-color-brown-100">
              <p className="text-color-brown-700 leading-relaxed mb-4">
                Indonesia adalah salah satu produsen kopi terbesar di dunia, dengan tiga varietas
                utama yang banyak dibudidayakan: <strong>Arabika</strong>, <strong>Robusta</strong>,
                dan <strong>Excelsa</strong>. Masing-masing memiliki karakteristik yang berbeda
                dalam hal rasa, aroma, dan nilai jual.
              </p>
              <p className="text-color-brown-700 leading-relaxed mb-4">
                Namun, identifikasi varietas kopi secara tradisional masih mengandalkan
                pengalaman visual para ahli atau pengujian laboratorium yang memakan waktu dan
                biaya. Hal ini menjadi hambatan, terutama bagi petani kopi skala kecil yang
                membutuhkan identifikasi cepat untuk menentukan harga jual yang tepat.
              </p>
              <p className="text-color-brown-700 leading-relaxed">
                <strong>CoffeeLens</strong> hadir sebagai solusi berbasis kecerdasan buatan yang
                memanfaatkan teknologi <em>instance segmentation</em> untuk mendeteksi setiap biji
                kopi dalam gambar, mengidentifikasi varietasnya, sekaligus menghitung jumlahnya
                secara otomatis dan efisien.
              </p>
            </div>
          </section>

          {/* ── Masalah yang Diselesaikan ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-red-400" />
              <h2 className="font-serif text-2xl font-bold text-color-brown-800">Masalah yang Diselesaikan</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-color-brown-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl block mb-3">{p.icon}</span>
                  <h3 className="font-serif font-bold text-color-brown-800 text-lg mb-2">{p.title}</h3>
                  <p className="text-color-brown-600 text-sm leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Solusi & Tujuan ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-emerald-500" />
              <h2 className="font-serif text-2xl font-bold text-color-brown-800">Tujuan Aplikasi</h2>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <h3 className="font-semibold text-emerald-800 mb-1">Akurasi Tinggi</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    Mendeteksi varietas biji kopi dengan akurasi tinggi menggunakan model segmentasi terlatih.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <h3 className="font-semibold text-emerald-800 mb-1">Cepat & Mudah</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    Cukup unggah satu gambar, dapatkan hasil deteksi lengkap dalam hitungan detik.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                    🌾
                  </div>
                  <h3 className="font-semibold text-emerald-800 mb-1">Tepat Sasaran</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    Dirancang untuk petani, peneliti, dan pelaku industri kopi Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Timeline Pengembangan ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-amber-500" />
              <h2 className="font-serif text-2xl font-bold text-color-brown-800">Proses Pengembangan</h2>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-color-brown-200" />
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <div key={i} className="relative flex gap-6">
                    {/* Icon bubble */}
                    <div className="w-16 h-16 rounded-2xl bg-color-brown-600 flex flex-col items-center justify-center text-white z-10 shrink-0 shadow-md">
                      <span className="text-xl">{t.icon}</span>
                      <span className="text-[9px] font-bold uppercase mt-0.5 opacity-80">{t.year}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-5 border border-color-brown-100 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-serif font-bold text-color-brown-800 text-lg mb-1">{t.title}</h3>
                      <p className="text-color-brown-600 text-sm leading-relaxed">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tech Stack ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-color-brown-500" />
              <h2 className="font-serif text-2xl font-bold text-color-brown-800">Teknologi yang Digunakan</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {techStack.map((t, i) => (
                <div
                  key={i}
                  className="bg-white border border-color-brown-100 rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl block mb-3">{t.icon}</span>
                  <h3 className="font-semibold text-color-brown-800 text-sm mb-1">{t.name}</h3>
                  <p className="text-color-brown-500 text-xs leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Tim ── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-violet-500" />
              <h2 className="font-serif text-2xl font-bold text-color-brown-800">Tim Pengembang</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {team.map((m, i) => (
                <div
                  key={i}
                  className="bg-white border border-color-brown-100 rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-color-brown-50 rounded-full flex items-center justify-center text-3xl border-2 border-color-brown-200">
                    {m.emoji}
                  </div>
                  <h3 className="font-serif font-bold text-color-brown-800 mb-1">{m.name}</h3>
                  <p className="text-color-brown-500 text-sm">{m.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div
            className="rounded-3xl p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #8B5A2B, #4A2C17)" }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
            <div className="relative z-10">
              <p className="text-amber-200 font-medium mb-2">Tertarik mencobanya?</p>
              <h3 className="font-serif text-2xl font-bold text-white mb-5">
                Mulai Deteksi Biji Kopi Anda
              </h3>
              <a
                href="/deteksi"
                className="inline-flex items-center gap-2 bg-white text-color-brown-700 px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Coba Sekarang →
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
