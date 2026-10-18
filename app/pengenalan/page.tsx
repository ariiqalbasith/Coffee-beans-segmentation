import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, TrendingUp, Zap, Star, Leaf, Globe, Award, Sprout, Thermometer } from "lucide-react";

const coffees = [
  {
    name: "Arabika",
    latin: "Coffea arabica",
    emoji: "☕",
    badge: "Paling Populer",
    headerStyle: { background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #ea580c 100%)" },
    cardBg: "bg-amber-50",
    border: "border-amber-200",
    infoBg: "bg-amber-100",
    infoText: "text-amber-900",
    iconBg: "bg-amber-200",
    iconColor: "text-amber-700",
    factText: "text-amber-800",
    origin: "Ethiopia, Colombia, Brasil",
    altitude: "600–2.000 mdpl",
    caffeine: "Rendah (1–1,5%)",
    taste: "Manis, fruity, asam lembut",
    description:
      "Arabika adalah varietas kopi paling populer di dunia dan mendominasi pasar specialty coffee global. Dikenal dengan profil rasa yang kompleks, asam yang menyegarkan, dan aroma floral yang khas. Biji Arabika berbentuk oval dan memiliki alur tengah yang berliku.",
    trivia: [
      { icon: Star, text: "Menyumbang 60–70% produksi kopi dunia" },
      { icon: Thermometer, text: "Rentan terhadap hama dan perubahan suhu" },
      { icon: TrendingUp, text: "Harga jual tertinggi di pasar global" },
      { icon: Leaf, text: "Biji oval, lebih kecil dan lebih datar" },
    ],
    funFact:
      "Arabika ditemukan pertama kali di Ethiopia sekitar tahun 700 M — penggembala kambing bernama Kaldi menyadari kambingnya sangat energik setelah memakan buah merah dari pohon kopi!",
    characteristics: [
      { label: "Kadar Gula", value: 80, color: "#f59e0b" },
      { label: "Keasaman", value: 70, color: "#d97706" },
      { label: "Kepahitan", value: 30, color: "#92400e" },
      { label: "Aroma", value: 90, color: "#78350f" },
    ],
  },
  {
    name: "Robusta",
    latin: "Coffea canephora",
    emoji: "⚡",
    badge: "Paling Kuat",
    headerStyle: { background: "linear-gradient(135deg, #78350f 0%, #451a03 60%, #1c0a00 100%)" },
    cardBg: "bg-stone-100",
    border: "border-stone-300",
    infoBg: "bg-stone-200",
    infoText: "text-stone-900",
    iconBg: "bg-stone-300",
    iconColor: "text-stone-700",
    factText: "text-stone-800",
    origin: "Afrika Barat, Vietnam, Indonesia",
    altitude: "0–600 mdpl",
    caffeine: "Tinggi (2–2,7%)",
    taste: "Pahit kuat, earthy, cokelat gelap",
    description:
      "Robusta adalah varietas kopi kedua terbesar di dunia, dikenal dengan kandungan kafein yang hampir dua kali lipat Arabika. Tumbuh di dataran rendah dan sangat tahan terhadap penyakit serta hama. Menjadi andalan espresso Italia karena menghasilkan crema yang tebal.",
    trivia: [
      { icon: Award, text: "Kafein 2× lebih tinggi dari Arabika" },
      { icon: Globe, text: "Andalan espresso & kopi instan dunia" },
      { icon: Sprout, text: "Lebih tahan penyakit & cuaca ekstrem" },
      { icon: Leaf, text: "Biji bulat & lebih kecil dari Arabika" },
    ],
    funFact:
      "Robusta adalah tulang punggung espresso Italia! Butirannya menghasilkan crema tebal. Vietnam adalah produsen Robusta terbesar di dunia, sekitar 40% ekspor kopi mereka adalah Robusta.",
    characteristics: [
      { label: "Kadar Gula", value: 40, color: "#78350f" },
      { label: "Keasaman", value: 20, color: "#92400e" },
      { label: "Kepahitan", value: 90, color: "#451a03" },
      { label: "Aroma", value: 60, color: "#57534e" },
    ],
  },
  {
    name: "Excelsa",
    latin: "Coffea excelsa",
    emoji: "🌿",
    badge: "Paling Unik",
    headerStyle: { background: "linear-gradient(135deg, #0f766e 0%, #047857 50%, #065f46 100%)" },
    cardBg: "bg-teal-50",
    border: "border-teal-200",
    infoBg: "bg-teal-100",
    infoText: "text-teal-900",
    iconBg: "bg-teal-200",
    iconColor: "text-teal-700",
    factText: "text-teal-800",
    origin: "Asia Tenggara, Afrika Tengah",
    altitude: "300–1.200 mdpl",
    caffeine: "Sedang (1–1,5%)",
    taste: "Tart, fruity, gelap, rempah kompleks",
    description:
      "Excelsa dahulu diklasifikasikan sebagai sub-spesies Liberica, namun kini diakui sebagai spesies tersendiri. Memiliki profil rasa yang sangat unik dan kompleks, membuatnya jadi bahan blending favorit para roaster specialty coffee untuk menambahkan dimensi rasa yang berbeda.",
    trivia: [
      { icon: Globe, text: "Dahulu sub-spesies Liberica, kini spesies mandiri" },
      { icon: Star, text: "Populer sebagai bahan blending specialty" },
      { icon: Leaf, text: "Biji lonjong mirip Liberica namun lebih kecil" },
      { icon: TrendingUp, text: "Tren naik di kalangan penikmat specialty coffee" },
    ],
    funFact:
      "Excelsa adalah 'seniman tersembunyi' dunia kopi. Profil rasanya yang kompleks membuat para roaster sering memakainya untuk menambah dimensi unik pada blend — setiap cangkir menjadi pengalaman yang berbeda!",
    characteristics: [
      { label: "Kadar Gula", value: 55, color: "#0f766e" },
      { label: "Keasaman", value: 65, color: "#047857" },
      { label: "Kepahitan", value: 50, color: "#065f46" },
      { label: "Aroma", value: 75, color: "#134e4a" },
    ],
  },
];

const infoKeys = [
  { key: "origin", icon: MapPin, label: "Asal" },
  { key: "altitude", icon: TrendingUp, label: "Ketinggian" },
  { key: "caffeine", icon: Zap, label: "Kafein" },
  { key: "taste", icon: Star, label: "Rasa" },
] as const;

export default function PengenalanPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-color-cream to-color-brown-50 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Header ── */}
          <div
            className="rounded-3xl p-8 mb-12 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #6B4423 0%, #4A2C17 60%, #2E1B0F 100%)" }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-20 w-48 h-48 bg-white rounded-full translate-y-1/2" />
            </div>
            <div className="relative z-10 text-center">
              <span className="text-5xl mb-4 block">🫘</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
                Pengenalan Varietas Biji Kopi
              </h1>
              <p className="text-amber-200 text-lg max-w-2xl mx-auto leading-relaxed">
                Pelajari karakteristik, asal-usul, dan keunikan tiga varietas kopi yang didukung oleh sistem deteksi kami.
              </p>
              <div className="flex justify-center gap-6 mt-6">
                {coffees.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium">
                    <span>{c.emoji}</span>
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Coffee Cards ── */}
          <div className="space-y-8">
            {coffees.map((c, idx) => (
              <div
                key={c.name}
                className={`${c.cardBg} border ${c.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className="grid lg:grid-cols-5">

                  {/* Left Header (2/5) */}
                  <div
                    className="lg:col-span-2 p-8 relative overflow-hidden flex flex-col justify-between"
                    style={c.headerStyle}
                  >
                    {/* Decorative circles */}
                    <div className="absolute -top-6 -right-6 w-36 h-36 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/10 rounded-full" />

                    <div className="relative z-10">
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white mb-4 border border-white/30">
                        {c.badge}
                      </span>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl border border-white/20 shrink-0">
                          {c.emoji}
                        </div>
                        <div>
                          <h2 className="font-serif text-3xl font-bold text-white drop-shadow">
                            {c.name}
                          </h2>
                          <p className="text-white/60 text-sm italic">{c.latin}</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    {/* Characteristics */}
                    <div className="relative z-10 mt-6 space-y-2">
                      {c.characteristics.map((ch) => (
                        <div key={ch.label} className="flex items-center gap-2">
                          <span className="text-white/60 text-xs w-24 shrink-0">{ch.label}</span>
                          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-white/80"
                              style={{ width: `${ch.value}%` }}
                            />
                          </div>
                          <span className="text-white/70 text-xs w-8 text-right">{ch.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Body (3/5) */}
                  <div className="lg:col-span-3 p-8 space-y-6">

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {infoKeys.map(({ key, icon: InfoIcon, label }) => (
                        <div key={label} className={`${c.infoBg} rounded-2xl p-4`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <InfoIcon className={`w-3.5 h-3.5 ${c.iconColor}`} />
                            <span className={`text-xs font-semibold uppercase tracking-wide ${c.iconColor} opacity-80`}>
                              {label}
                            </span>
                          </div>
                          <p className={`text-sm font-bold leading-snug ${c.infoText}`}>
                            {c[key as keyof typeof c] as string}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Trivia */}
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${c.iconColor}`}>
                        ✦ Fakta Menarik
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {c.trivia.map((t, i) => {
                          const TIcon = t.icon;
                          return (
                            <div key={i} className="flex items-start gap-2">
                              <div className={`w-7 h-7 ${c.iconBg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                                <TIcon className={`w-4 h-4 ${c.iconColor}`} />
                              </div>
                              <p className={`text-sm leading-snug ${c.factText}`}>{t.text}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Fun Fact */}
                    <div className={`bg-white border ${c.border} rounded-2xl p-4 relative`}>
                      <div
                        className="absolute -top-3 left-4 text-white text-xs px-3 py-0.5 rounded-full font-semibold shadow"
                        style={{ background: "linear-gradient(90deg, #8B5A2B, #6B4423)" }}
                      >
                        💡 Tahukah Kamu?
                      </div>
                      <p className={`text-sm leading-relaxed mt-2 ${c.factText}`}>{c.funFact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA Footer ── */}
          <div
            className="mt-12 rounded-3xl p-8 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #8B5A2B, #6B4423)" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <p className="text-amber-200 font-medium mb-2">Sudah mengenal varietas kopinya?</p>
              <h3 className="font-serif text-2xl font-bold text-white mb-5">
                Coba Deteksi Biji Kopi Anda Sekarang
              </h3>
              <a
                href="/deteksi"
                className="inline-flex items-center gap-2 bg-white text-color-brown-700 px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Mulai Deteksi
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
