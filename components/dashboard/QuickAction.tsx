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
    <div
      className="rounded-xl p-6 flex items-center justify-between gap-4"
      style={{ background: "linear-gradient(135deg, #8B5A2B 0%, #6B4423 50%, #4A2C17 100%)" }}
    >
      <div>
        <h4 className="text-white text-base font-semibold mb-1">{title}</h4>
        <p className="text-amber-200 text-sm">{description}</p>
      </div>
      <Link
        href={href}
        className="shrink-0 bg-white text-stone-700 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-amber-50 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}
