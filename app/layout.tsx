import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CoffeeLens - Deteksi Biji Kopi Berbasis AI",
  description: "Aplikasi deteksi biji kopi berbasis AI — identifikasi varietas Arabika, Robusta, dan Excelsa sekaligus hitung jumlah biji dari satu gambar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${playfair.variable} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
