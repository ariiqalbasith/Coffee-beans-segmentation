"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScanSearch,
  ClipboardList,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Coffee,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Dashboard",   href: "/dashboard",  icon: LayoutDashboard },
  { label: "Klasifikasi", href: "/klasifikasi", icon: ScanSearch      },
  { label: "Riwayat",     href: "/riwayat",     icon: ClipboardList   },
  { label: "Help",        href: "/help",        icon: HelpCircle      },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      aria-expanded={isExpanded}
      aria-label="Main sidebar"
      className={`bg-color-brown-500 rounded-xl p-4 flex flex-col transition-all duration-300 ${
        isExpanded ? "w-52" : "w-16"
      }`}
    >
      {/* Logo — klik balik ke landing page */}
      <Link
        href="/"
        className="flex items-center gap-3 mb-6 overflow-hidden group"
        aria-label="Kembali ke halaman utama"
      >
        <div className="w-9 h-9 bg-color-cream rounded-lg flex items-center justify-center shrink-0 group-hover:bg-color-brown-100 transition-colors">
          <Coffee className="w-5 h-5 text-color-brown-600" />
        </div>
        {isExpanded && (
          <span className="text-color-cream font-semibold text-sm whitespace-nowrap group-hover:text-color-brown-100 transition-colors">
            KopiPrediksi
          </span>
        )}
      </Link>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-color-cream focus-visible:outline-none ${
                isActive
                  ? "bg-color-cream text-color-brown-600"
                  : "text-color-brown-200 hover:bg-color-brown-400"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        className="mt-auto pt-4 bg-color-brown-600 text-color-cream px-3 py-2 rounded-lg text-xs font-medium hover:bg-color-brown-700 transition-colors flex items-center justify-center gap-1"
      >
        {isExpanded ? (
          <>
            <ChevronLeft className="w-4 h-4" />
            <span>Collapse</span>
          </>
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
