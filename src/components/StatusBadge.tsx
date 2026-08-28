export default function StatusBadge({ durum }: { durum: string }) {
  const isActive = durum === "Aktif";
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-slate-200 text-slate-600"
      }`}
    >
      {durum}
    </span>
  );
}
