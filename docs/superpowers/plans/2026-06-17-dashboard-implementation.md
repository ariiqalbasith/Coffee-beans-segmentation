# KopiPrediksi Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a dashboard page at `/dashboard` with collapsible sidebar, stat card, quick action CTA, and system summary using KopiPrediksi's warm brown & cream theme.

**Architecture:** Single-page dashboard using Next.js App Router with client components. Sidebar state managed via React useState. Components organized in `components/dashboard/` folder.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

---

## File Structure

```
app/
├── dashboard/
│   └── page.tsx              → Dashboard page (client component)
components/
└── dashboard/
    ├── Sidebar.tsx           → Collapsible sidebar with nav items
    ├── StatCard.tsx          → Statistics card (Total Klasifikasi)
    ├── QuickAction.tsx       → CTA card with gradient background
    └── SystemSummary.tsx     → System status indicators
```

---

## Tasks

### Task 1: Create folder structure

**Files:**
- Create: `components/dashboard/` (directory)

- [ ] **Step 1: Create dashboard components directory**

Run: `mkdir -p components/dashboard`

---

### Task 2: Implement Sidebar component

**Files:**
- Create: `components/dashboard/Sidebar.tsx`

- [ ] **Step 1: Write Sidebar component**

Create `components/dashboard/Sidebar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Klasifikasi", href: "/klasifikasi", icon: "🔍" },
  { label: "Riwayat", href: "/riwayat", icon: "📜" },
  { label: "Statistik", href: "/statistik", icon: "📈" },
  { label: "Pengaturan", href: "/pengaturan", icon: "⚙️" },
  { label: "Help", href: "/help", icon: "❓" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`bg-color-brown-500 rounded-xl p-4 flex flex-col transition-all duration-300 ${
        isExpanded ? "w-52" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-color-cream rounded-lg flex items-center justify-center text-lg">
          ☕
        </div>
        {isExpanded && (
          <span className="text-color-cream font-semibold text-sm">
            KopiPrediksi
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-color-cream text-color-brown-500"
                  : "text-color-brown-200 hover:bg-color-brown-400"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {isExpanded && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-auto pt-4 bg-color-brown-600 text-color-cream px-3 py-2 rounded-lg text-xs font-medium hover:bg-color-brown-700 transition-colors"
      >
        {isExpanded ? "← Collapse" : "→"}
      </button>
    </aside>
  );
}
```

- [ ] **Step 2: Verify file created**

Run: `ls -la components/dashboard/Sidebar.tsx`

---

### Task 3: Implement StatCard component

**Files:**
- Create: `components/dashboard/StatCard.tsx`

- [ ] **Step 1: Write StatCard component**

Create `components/dashboard/StatCard.tsx`:

```tsx
interface StatCardProps {
  title: string;
  value: number | string;
  trend?: string;
  icon: string;
}

export default function StatCard({ title, value, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-5">
      <div className="w-14 h-14 bg-gradient-to-br from-color-brown-500 to-color-brown-400 rounded-xl flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-color-brown-400 text-xs uppercase tracking-wide">
          {title}
        </p>
        <p className="text-color-brown-700 text-3xl font-bold mt-1">
          {typeof value === "number" ? value.toLocaleString("id-ID") : value}
        </p>
        {trend && (
          <p className="text-color-brown-500 text-xs mt-0.5">{trend}</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify file created**

Run: `ls -la components/dashboard/StatCard.tsx`

---

### Task 4: Implement QuickAction component

**Files:**
- Create: `components/dashboard/QuickAction.tsx`

- [ ] **Step 1: Write QuickAction component**

Create `components/dashboard/QuickAction.tsx`:

```tsx
import Link from "next/link";

interface QuickActionProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function QuickAction({
  title,
  description,
  buttonText,
  href,
}: QuickActionProps) {
  return (
    <div className="bg-gradient-to-br from-color-brown-500 to-color-brown-600 rounded-xl p-6 flex items-center justify-between">
      <div>
        <h4 className="text-color-cream text-base font-semibold mb-1">
          {title}
        </h4>
        <p className="text-color-brown-200 text-sm">{description}</p>
      </div>
      <Link
        href={href}
        className="bg-color-cream text-color-brown-600 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-color-brown-100 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify file created**

Run: `ls -la components/dashboard/QuickAction.tsx`

---

### Task 5: Implement SystemSummary component

**Files:**
- Create: `components/dashboard/SystemSummary.tsx`

- [ ] **Step 1: Write SystemSummary component**

Create `components/dashboard/SystemSummary.tsx`:

```tsx
interface StatusItem {
  label: string;
  value: string;
  variant?: "success" | "neutral";
}

interface SystemSummaryProps {
  items: StatusItem[];
}

export default function SystemSummary({ items }: SystemSummaryProps) {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-color-brown-500 text-xs uppercase tracking-wide mb-3">
        Ringkasan Sistem
      </p>
      <div className="flex gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-color-cream rounded-lg p-3 text-center"
          >
            <p className="text-color-brown-400 text-xs">{item.label}</p>
            <p
              className={`text-sm font-semibold mt-1 ${
                item.variant === "success"
                  ? "text-green-500"
                  : "text-color-brown-600"
              }`}
            >
              {item.label === "Status" && item.variant === "success" && "● "}
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify file created**

Run: `ls -la components/dashboard/SystemSummary.tsx`

---

### Task 6: Build Dashboard page

**Files:**
- Create: `app/dashboard/page.tsx`

- [ ] **Step 1: Create dashboard page directory**

Run: `mkdir -p app/dashboard`

- [ ] **Step 2: Write Dashboard page**

Create `app/dashboard/page.tsx`:

```tsx
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";
import SystemSummary from "@/components/dashboard/SystemSummary";

export default function Dashboard() {
  // Mock data - akan di-fetch dari API di fase berikutnya
  const stats = {
    totalKlasifikasi: 1247,
    growth: "↑ 12% dari bulan lalu",
  };

  const systemStatus = [
    { label: "Status", value: "Online", variant: "success" as const },
    { label: "Versi", value: "v1.0.0" },
    { label: "API", value: "Ready" },
  ];

  return (
    <div className="min-h-screen bg-color-cream flex">
      {/* Sidebar */}
      <div className="p-4">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6">
          <div>
            <h2 className="text-color-brown-700 text-xl font-bold">Dashboard</h2>
            <p className="text-color-brown-400 text-sm mt-0.5">
              Selamat datang di KopiPrediksi 👋
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-color-brown-100 rounded-full" />
            <span className="text-color-brown-600 text-sm">User</span>
          </div>
        </div>

        {/* Stat Card */}
        <div className="mb-6">
          <StatCard
            title="Total Klasifikasi"
            value={stats.totalKlasifikasi}
            trend={stats.growth}
            icon="📊"
          />
        </div>

        {/* Quick Action */}
        <div className="mb-6">
          <QuickAction
            title="Mulai Klasifikasi Baru"
            description="Prediksi kualitas biji kopi dalam hitungan detik"
            buttonText="Mulai Klasifikasi →"
            href="/klasifikasi"
          />
        </div>

        {/* System Summary */}
        <div>
          <SystemSummary items={systemStatus} />
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Verify file created**

Run: `ls -la app/dashboard/page.tsx`

---

### Task 7: Test the dashboard

- [ ] **Step 1: Run dev server**

Run: `npm run dev`

- [ ] **Step 2: Open browser**

Navigate to: `http://localhost:3000/dashboard`

- [ ] **Step 3: Verify all acceptance criteria**

Check:
- [ ] Dashboard page loads at `/dashboard`
- [ ] Sidebar visible with 6 menu items
- [ ] Sidebar can be collapsed/expanded (click toggle button)
- [ ] Stat card shows "Total Klasifikasi" with value 1,247
- [ ] Quick action button visible with gradient
- [ ] System summary shows Status/Version/API indicators
- [ ] Colors match KopiPrediksi theme (cream/brown)

---

## Verification Checklist

| Criteria | Status |
|----------|--------|
| `/dashboard` route works | ⬜ |
| Sidebar has 6 nav items | ⬜ |
| Sidebar toggle works | ⬜ |
| Stat card displays correctly | ⬜ |
| Quick action button works | ⬜ |
| System summary visible | ⬜ |
| Colors match theme | ⬜ |
| No console errors | ⬜ |
