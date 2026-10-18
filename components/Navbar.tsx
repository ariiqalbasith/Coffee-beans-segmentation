"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/deteksi", label: "Deteksi" },
    { href: "/pengenalan", label: "Jenis Kopi" },
    { href: "/tentang", label: "Tentang" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-color-cream/95 backdrop-blur-sm border-b border-color-brown-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 inline-block">☕</span>
            <span className="font-serif font-bold text-xl text-color-brown-700">
              CoffeeLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-color-brown-600 text-color-cream"
                    : "text-color-brown-600 hover:text-color-brown-800 hover:bg-color-brown-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Link
              href="/deteksi"
              className="bg-color-dark text-color-brown-800 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-color-brown-800 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(74,44,23,0.5)] hover:shadow-[0_0_30px_rgba(74,44,23,0.7)]"
            >
              Mulai Deteksi →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-color-brown-700 rounded-lg hover:bg-color-brown-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-color-cream border-t border-color-brown-200">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-color-brown-600 text-color-cream"
                    : "text-color-brown-600 hover:text-color-brown-800 hover:bg-color-brown-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/deteksi"
              onClick={() => setIsOpen(false)}
              className="block mt-3 text-center bg-color-dark text-color-brown-800 px-4 py-3 rounded-xl font-bold hover:bg-color-brown-800 transition-all duration-300 shadow-[0_0_20px_rgba(74,44,23,0.5)]"
            >
              Mulai Deteksi →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
