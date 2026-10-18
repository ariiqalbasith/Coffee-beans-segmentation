import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";
import SystemSummary from "@/components/dashboard/SystemSummary";
import { BarChart3, User } from "lucide-react";

export default function Dashboard() {
  const stats = {
    totalKlasifikasi: 1247,
    growth: "12% dari bulan lalu",
  };

  const systemStatus = [
    { label: "Status", value: "Online", variant: "success" as const },
    { label: "Versi",  value: "v1.0.0" },
    { label: "API",    value: "Ready"  },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <div className="p-4 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6 shadow-sm">
          <div>
            <h2 className="text-stone-800 text-xl font-bold">Dashboard</h2>
            <p className="text-stone-500 text-sm mt-0.5">
              Selamat datang di KopiPrediksi 👋
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-amber-700" />
            </div>
            <span className="text-stone-600 text-sm font-medium">User</span>
          </div>
        </div>

        {/* Stat Card */}
        <div className="mb-6">
          <StatCard
            title="Total Klasifikasi"
            value={stats.totalKlasifikasi}
            trend={stats.growth}
            icon={BarChart3}
          />
        </div>

        {/* Quick Action */}
        <div className="mb-6">
          <QuickAction
            title="Mulai Klasifikasi Baru"
            description="Kenali jenis kopi Anda dalam hitungan detik"
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
