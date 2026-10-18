import Sidebar from "@/components/dashboard/Sidebar";
import {
  Upload,
  Cpu,
  CheckCircle2,
  BookOpen,
  Coffee,
  Leaf,
  Sprout,
  Globe,
  Zap,
  Star,
  Thermometer,
  MapPin,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Unggah Gambar",
    description:
      "Ambil foto biji kopi Anda atau unggah gambar dari perangkat. Pastikan pencahayaan cukup dan biji kopi terlihat jelas.",
    iconGradient: "from-amber-400 to-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    numColor: "text-orange-200",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Proses AI",
    description:
      "Model machine learning kami menganalisis tekstur, warna, dan bentuk biji kopi secara otomatis dalam hitungan detik.",
    iconGradient: "from-stone-500 to-stone-700",
    bg: "bg-stone-100",
    border: "border-stone-300",
    numColor: "text-stone-300",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Lihat Hasil",
    description:
      "Dapatkan prediksi jenis kopi beserta tingkat akurasi dan informasi detail tentang varietas kopi yang terdeteksi.",
    iconGradient: "from-emerald-400 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    numColor: "text-emerald-200",
  },
];

const coffees = [
  /* ── Arabica ─────────────────────────────── */
  {
    name: "Arabica",
    latin: "Coffea arabica",
    emoji: "☕",
    // Semua gradient pakai Tailwind standard (tidak ada custom CSS var)
    headerStyle: { background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #ea580c 100%)" },
    cardBg: "bg-amber-50",
    border: "border-amber-300",
    infoBg: "bg-amber-100",
    infoText: "text-amber-900",
    factBg: "bg-white",
    factText: "text-amber-800",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-700",
    badgeBg: "bg-white/30",
    badgeText: "text-white",
    badgeLabel: "Paling Populer",
    origin: "Ethiopia, Colombia, Brasil",
    altitude: "600–2.000 mdpl",
    caffeine: "Rendah (1–1.5%)",
    taste: "Manis, fruity, asam lembut",
    trivia: [
      { icon: Star,        text: "Menyumbang 60–70% produksi kopi dunia" },
      { icon: Thermometer, text: "Rentan terhadap hama dan perubahan suhu" },
      { icon: TrendingUp,  text: "Harga jual tertinggi di pasar global" },
      { icon: Leaf,        text: "Biji oval, lebih kecil & datar" },
    ],
    funFact:
      "Arabica ditemukan pertama kali di Ethiopia ~700 M — penggembala kambing Kaldi menyadari kambingnya sangat energik setelah memakan buah merahnya!",
  },
  /* ── Robusta ─────────────────────────────── */
  {
    name: "Robusta",
    latin: "Coffea canephora",
    emoji: "⚡",
    headerStyle: { background: "linear-gradient(135deg, #78350f 0%, #451a03 60%, #1c0a00 100%)" },
    cardBg: "bg-stone-100",
    border: "border-stone-400",
    infoBg: "bg-stone-200",
    infoText: "text-stone-900",
    factBg: "bg-white",
    factText: "text-stone-800",
    iconBg: "bg-stone-300",
    iconColor: "text-stone-700",
    badgeBg: "bg-white/20",
    badgeText: "text-white",
    badgeLabel: "Paling Kuat",
    origin: "Afrika Barat, Vietnam, Indonesia",
    altitude: "0–600 mdpl",
    caffeine: "Tinggi (2–2.7%)",
    taste: "Pahit kuat, earthy, cokelat gelap",
    trivia: [
      { icon: Award,      text: "Kafein 2× lebih tinggi dari Arabica" },
      { icon: Globe,      text: "Andalan espresso & kopi instan dunia" },
      { icon: Sprout,     text: "Lebih tahan penyakit & cuaca ekstrem" },
      { icon: Leaf,       text: "Biji bulat & lebih kecil dari Arabica" },
    ],
    funFact:
      "Robusta adalah tulang punggung espresso Italia! Butirannya menghasilkan crema tebal. Vietnam adalah produsen Robusta terbesar, ~40% ekspor kopi mereka.",
  },
  /* ── Liberica ────────────────────────────── */
  {
    name: "Liberica",
    latin: "Coffea liberica",
    emoji: "🌍",
    headerStyle: { background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #3730a3 100%)" },
    cardBg: "bg-violet-50",
    border: "border-violet-300",
    infoBg: "bg-violet-100",
    infoText: "text-violet-900",
    factBg: "bg-white",
    factText: "text-violet-800",
    iconBg: "bg-violet-200",
    iconColor: "text-violet-700",
    badgeBg: "bg-white/25",
    badgeText: "text-white",
    badgeLabel: "Paling Langka",
    origin: "Liberia, Filipina, Malaysia",
    altitude: "200–900 mdpl",
    caffeine: "Sedang (1.2–1.5%)",
    taste: "Berasap, kayu, bunga, sedikit anggur",
    trivia: [
      { icon: Star,       text: "Hanya <2% dari produksi kopi dunia" },
      { icon: MapPin,     text: "Populer di Filipina (Kapeng Barako)" },
      { icon: Leaf,       text: "Biji terbesar di antara semua spesies kopi" },
      { icon: Sprout,     text: "Pohon bisa tumbuh hingga 20 meter!" },
    ],
    funFact:
      "Liberica menyelamatkan industri kopi dunia! Saat wabah jamur merusak Arabica Asia tahun 1890an, petani beralih ke Liberica. Di Filipina dikenal sebagai 'Barako', warisan budaya nasional.",
  },
  /* ── Excelsa ─────────────────────────────── */
  {
    name: "Excelsa",
    latin: "Coffea excelsa",
    emoji: "🌿",
    headerStyle: { background: "linear-gradient(135deg, #0f766e 0%, #047857 50%, #065f46 100%)" },
    cardBg: "bg-teal-50",
    border: "border-teal-300",
    infoBg: "bg-teal-100",
    infoText: "text-teal-900",
    factBg: "bg-white",
    factText: "text-teal-800",
    iconBg: "bg-teal-200",
    iconColor: "text-teal-700",
    badgeBg: "bg-white/20",
    badgeText: "text-white",
    badgeLabel: "Paling Unik",
    origin: "Asia Tenggara, Afrika Tengah",
    altitude: "300–1.200 mdpl",
    caffeine: "Sedang (1–1.5%)",
    taste: "Tart, fruity, gelap, rempah kompleks",
    trivia: [
      { icon: Globe,      text: "Dahulu sub-spesies Liberica, kini spesies sendiri" },
      { icon: Star,       text: "Populer sebagai bahan blending specialty" },
      { icon: Leaf,       text: "Biji lonjong mirip Liberica namun lebih kecil" },
      { icon: TrendingUp, text: "Tren naik di kalangan penikmat specialty coffee" },
    ],
    funFact:
      "Excelsa adalah 'seniman tersembunyi' dunia kopi. Profil rasanya yang kompleks membuat para roaster sering memakainya untuk menambah dimensi unik pada blend — setiap cangkir jadi pengalaman berbeda!",
  },
];

const infoKeys = [
  { key: "origin",    icon: MapPin,     label: "Asal"       },
  { key: "altitude",  icon: TrendingUp, label: "Ketinggian" },
  { key: "caffeine",  icon: Zap,        label: "Kafein"     },
  { key: "taste",     icon: Star,       label: "Rasa"       },
] as const;

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function HelpPage() {
  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <div className="p-4 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">

        {/* ── Page Header ── */}
        <div
          className="rounded-2xl p-6 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #6B4423 0%, #4A2C17 60%, #2E1B0F 100%)" }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-white rounded-full translate-y-1/2" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-amber-100" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">
                Panduan & Trivia Kopi
              </h1>
              <p className="text-amber-200 text-sm mt-1">
                Cara menggunakan KopiPrediksi + fakta menarik 4 varietas kopi unggulan
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            SECTION 1 — PANDUAN
        ══════════════════════════════════════ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 rounded-full bg-amber-500" />
            <h2 className="font-serif text-xl font-bold text-stone-800">
              Cara Menggunakan KopiPrediksi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className={`${s.bg} border ${s.border} rounded-2xl p-6 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Step number watermark */}
                  <span className={`absolute top-3 right-4 font-serif text-5xl font-bold select-none ${s.numColor}`}>
                    {s.step}
                  </span>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.iconGradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-serif font-bold text-stone-800 text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Arrow connector */}
          <div className="hidden md:flex justify-center items-center gap-4 mt-3 px-16">
            <div className="flex-1 h-px bg-stone-300" />
            <ChevronRight className="w-5 h-5 text-stone-400 shrink-0" />
            <div className="flex-1 h-px bg-stone-300" />
            <ChevronRight className="w-5 h-5 text-stone-400 shrink-0" />
            <div className="flex-1 h-px bg-stone-300" />
          </div>

          {/* CTA ke klasifikasi */}
          <div className="mt-5 flex justify-center">
            <a
              href="/klasifikasi"
              className="inline-flex items-center gap-2 text-white px-7 py-3 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}
            >
              Coba Sekarang
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-stone-300" />
          <div className="flex items-center gap-2 text-stone-500">
            <Coffee className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Trivia Kopi</span>
            <Coffee className="w-4 h-4" />
          </div>
          <div className="flex-1 h-px bg-stone-300" />
        </div>

        {/* ══════════════════════════════════════
            SECTION 2 — TRIVIA
        ══════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 rounded-full bg-teal-500" />
            <h2 className="font-serif text-xl font-bold text-stone-800">
              Kenali 4 Varietas Kopi yang Diprediksi
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {coffees.map((c) => (
              <div
                key={c.name}
                className={`${c.cardBg} border ${c.border} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              >
                {/* Card Header — pakai inline style supaya gradient pasti tampil */}
                <div className="p-5 relative overflow-hidden" style={c.headerStyle}>
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full" />
                  </div>
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.badgeBg} ${c.badgeText} border border-white/30 mb-2 inline-block`}>
                        {c.badgeLabel}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white drop-shadow">
                        {c.name}
                      </h3>
                      <p className="text-white/70 text-xs italic mt-0.5">{c.latin}</p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      {c.emoji}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {infoKeys.map(({ key, icon: InfoIcon, label }) => (
                      <div key={label} className={`${c.infoBg} rounded-xl p-3`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <InfoIcon className={`w-3 h-3 ${c.iconColor}`} />
                          <span className={`text-xs font-semibold uppercase tracking-wide ${c.iconColor} opacity-80`}>
                            {label}
                          </span>
                        </div>
                        <p className={`text-xs font-bold leading-tight ${c.infoText}`}>
                          {c[key as keyof typeof c] as string}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Trivia Points */}
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${c.iconColor}`}>
                      ✦ Fakta Menarik
                    </p>
                    <div className="space-y-2">
                      {c.trivia.map((t, i) => {
                        const TIcon = t.icon;
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <div className={`w-6 h-6 ${c.iconBg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                              <TIcon className={`w-3.5 h-3.5 ${c.iconColor}`} />
                            </div>
                            <p className={`text-xs leading-snug font-medium ${c.factText}`}>{t.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fun Fact */}
                  <div className={`${c.factBg} border ${c.border} rounded-xl p-3 relative`}>
                    <div
                      className="absolute -top-3 left-3 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold shadow"
                      style={{ background: "linear-gradient(90deg, #8B5A2B, #6B4423)" }}
                    >
                      💡 Tahukah Kamu?
                    </div>
                    <p className={`text-xs leading-relaxed mt-2 ${c.factText}`}>
                      {c.funFact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-8" />
      </main>
    </div>
  );
}
