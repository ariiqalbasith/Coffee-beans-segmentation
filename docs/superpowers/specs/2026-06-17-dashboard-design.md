# KopiPrediksi Dashboard - Design Specification

**Date:** 2026-06-17
**Author:** Claude
**Status:** Approved

---

## 1. Overview

Menambahkan halaman dashboard untuk platform KopiPrediksi dengan gaya SaaS modern. Dashboard menampilkan ringkasan sistem, statistik klasifikasi, dan akses cepat ke fitur klasifikasi.

---

## 2. Design Decisions

### Layout
- **Collapsible Sidebar** - Sidebar dapat di-collapse menjadi icon-only (60px) atau expanded (200px)
- **Main Content Area** - Area konten utama yang bersih dengan padding konsisten
- **Sticky Header** - User info dan welcome message di header area

### Color Palette
Menggunakan existing KopiPrediksi theme:
- Background: `#FDF6E3` (cream)
- Primary: `#8B5A2B` (brown-500)
- Secondary: `#D4B896` (brown-200)
- Text Dark: `#4A2C17` (brown-700)
- Text Light: `#F5E6D3` (cream)

### Typography
- Font: Poppins (via existing Next.js setup)
- Headings: Bold weight
- Body: Regular/Medium weight

---

## 3. Navigation Structure

Sidebar menu items:
1. **Dashboard** - Halaman overview (active by default)
2. **Klasifikasi** - Halaman prediksi kualitas kopi
3. **Riwayat** - Riwayat hasil klasifikasi
4. **Statistik** - Analisis data klasifikasi
5. **Pengaturan** - Konfigurasi aplikasi
6. **Help** - Panduan dan dokumentasi

---

## 4. Dashboard Content

### Stat Card - Total Klasifikasi
- Icon dengan gradient background
- Number display (bold, large)
- Growth indicator (↑ % dari bulan lalu)

### Quick Action Card
- Gradient background (brown)
- Title + description
- CTA button: "Mulai Klasifikasi →"

### System Summary Card
- Status: Online indicator (green)
- Versi: v1.0.0
- API: Ready

---

## 5. Component Architecture

```
app/
├── dashboard/
│   └── page.tsx              → Dashboard page
components/
└── dashboard/
    ├── Sidebar.tsx           → Collapsible sidebar + navigation
    ├── StatCard.tsx           → Statistics card component
    └── QuickAction.tsx       → CTA card component
```

### Sidebar.tsx
- Props: `activeItem: string`
- State: `isExpanded: boolean` (default: true)
- Features:
  - Toggle button (expand/collapse)
  - Active state highlighting
  - Hover effects
  - Icon + text display (text hidden when collapsed)

### StatCard.tsx
- Props: `title: string`, `value: number | string`, `trend?: string`
- Display: Icon, label, value, optional trend indicator

### QuickAction.tsx
- Props: `title: string`, `description: string`, `onClick: () => void`
- Static styling with gradient background
- CTA button navigates to `/klasifikasi`

---

## 6. Data & State

### Sidebar State
- Persisted in component state
- Default: expanded
- Toggle: on button click

### Dashboard Stats (Phase 1 - Mock)
```typescript
{
  totalKlasifikasi: 1247,
  growth: 12, // percent
  systemStatus: 'online',
  version: '1.0.0',
  apiStatus: 'ready'
}
```

### Future: API Integration
Stats akan di-fetch dari backend API. Structure:
```
GET /api/stats → { totalKlasifikasi, growth, ... }
```

---

## 7. Routes

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Overview page |
| `/klasifikasi` | (future) | Prediksi page |
| `/riwayat` | (future) | History page |
| `/statistik` | (future) | Analytics page |
| `/pengaturan` | (future) | Settings page |
| `/help` | (future) | Help page |

---

## 8. Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** Client Components ("use client")
- **State:** React useState for sidebar toggle
- **Icons:** Emoji atau simple SVG shapes

---

## 9. Implementation Priority

### Phase 1: Dashboard Page (This Sprint)
- [ ] Create folder structure
- [ ] Implement Sidebar component
- [ ] Implement StatCard component
- [ ] Implement QuickAction component
- [ ] Build Dashboard page
- [ ] Add styling

### Phase 2: Navigation (Future)
- [ ] Create /klasifikasi page
- [ ] Create /riwayat page
- [ ] Wire up sidebar navigation

---

## 10. Acceptance Criteria

1. Dashboard page loads at `/dashboard`
2. Sidebar is visible with all 6 menu items
3. Sidebar can be collapsed/expanded with smooth transition
4. Stat card displays "Total Klasifikasi" with mock value
5. Quick action button navigates to `/klasifikasi`
6. System summary shows status indicators
7. Design is responsive (mobile-friendly sidebar)
8. Colors match existing KopiPrediksi theme
