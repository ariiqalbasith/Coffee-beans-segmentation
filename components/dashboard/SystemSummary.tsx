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
      <p className="text-stone-500 text-xs uppercase tracking-wide font-semibold mb-3">
        Ringkasan Sistem
      </p>
      <div className="flex gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-stone-100 rounded-lg p-3 text-center"
          >
            <p className="text-stone-400 text-xs font-medium">{item.label}</p>
            <p
              className={`text-sm font-bold mt-1 ${
                item.variant === "success"
                  ? "text-emerald-600"
                  : "text-stone-700"
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
