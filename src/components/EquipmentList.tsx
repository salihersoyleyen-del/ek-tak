"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Equipment } from "@/lib/data";
import StatusBadge from "./StatusBadge";

export default function EquipmentList({
  equipment,
}: {
  equipment: Equipment[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return equipment;
    const q = query.toLocaleLowerCase("tr-TR");
    return equipment.filter(
      (e) =>
        e.ad.toLocaleLowerCase("tr-TR").includes(q) ||
        e.seriNo.toLocaleLowerCase("tr-TR").includes(q) ||
        e.konum.toLocaleLowerCase("tr-TR").includes(q) ||
        e.istasyon.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [equipment, query]);

  const total = equipment.length;
  const active = equipment.filter((e) => e.durum === "Aktif").length;
  const passive = total - active;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Ekipmanlar</h1>
        <button
          disabled
          title="Bu özellik yakında eklenecek"
          className="cursor-not-allowed rounded-lg bg-blue-600/50 px-4 py-2 text-sm font-medium text-white"
        >
          + Ekipman Ekle
        </button>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ad, seri no veya konuma göre ara..."
        className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard label="Toplam" value={total} />
        <StatCard label="Aktif" value={active} />
        <StatCard label="Pasif" value={passive} />
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-1 text-sm font-medium text-slate-700">
          Yaklaşan Bakım/Muayene
        </h2>
        <p className="text-sm text-slate-400">Yaklaşan bakım/muayene yok.</p>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-400">
            Sonuç bulunamadı.
          </p>
        )}
        {filtered.map((e) => (
          <Link
            key={e.id}
            href={`/equipment/${e.id}`}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow"
          >
            <div>
              <p className="font-medium text-slate-900">{e.ad}</p>
              <p className="mt-0.5 text-sm text-slate-500">
                Seri No: {e.seriNo}
              </p>
            </div>
            <StatusBadge durum={e.durum} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
