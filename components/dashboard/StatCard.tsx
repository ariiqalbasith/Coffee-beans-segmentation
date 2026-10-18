import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  trend?: string;
  icon: LucideIcon;
}

export default function StatCard({ title, value, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-5">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg, #A67B5B, #6B4423)" }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <p className="text-stone-500 text-xs uppercase tracking-wide font-medium">
          {title}
        </p>
        <p className="text-stone-800 text-3xl font-bold mt-1">
          {typeof value === "number" ? value.toLocaleString("id-ID") : value}
        </p>
        {trend && (
          <p className="text-amber-700 text-xs mt-0.5 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}