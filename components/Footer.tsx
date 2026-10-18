import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/deteksi", label: "Deteksi" },
    { href: "/pengenalan", label: "Jenis Kopi" },
    { href: "/tentang", label: "Tentang" },
  ];

  return (
    <footer className="bg-color-brown-800 text-color-brown-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☕</span>
              <span className="font-serif font-bold text-xl text-color-cream">CoffeeLens</span>
            </div>
            <p className="text-color-brown-300 text-sm leading-relaxed max-w-xs">
              Aplikasi deteksi biji kopi berbasis AI — identifikasi varietas dan hitung jumlah biji
              otomatis dari satu gambar.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-color-cream mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-color-brown-300 hover:text-color-cream transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-color-cream mb-4">Tentang Aplikasi</h4>
            <p className="text-color-brown-300 text-sm leading-relaxed">
              Dibangun untuk membantu petani dan pelaku industri kopi Indonesia dalam
              mengidentifikasi varietas biji kopi secara cepat dan efisien menggunakan
              teknologi segmentasi gambar.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-color-brown-300 text-sm">Model Segmentasi Aktif</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-color-brown-700 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-color-brown-400">
              © {currentYear} CoffeeLens. Dibuat untuk keperluan tugas akhir.
            </p>
            <p className="text-sm text-color-brown-400">
              Varietas: Arabika · Robusta · Excelsa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
