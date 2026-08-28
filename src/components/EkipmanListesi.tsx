"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Ekipman } from "@/lib/data";

export default function EkipmanListesi({
  equipment,
  baslik,
}: {
  equipment: Ekipman[];
  baslik: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return equipment;
    const q = query.toLocaleLowerCase("tr-TR");
    return equipment.filter(
      (e) =>
        e.kod.toLocaleLowerCase("tr-TR").includes(q) ||
        e.istasyon?.toLocaleLowerCase("tr-TR").includes(q) ||
        e.hat?.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [equipment, query]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">{baslik}</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ad, seri no veya konuma göre ara..."
        className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="mb-3 text-xs text-slate-400">{filtered.length} kayıt</p>
      <div className="space-y-3">
        {filtered.map((e) => (
          <Link
            key={e.id}
            href={`/ekipman/${e.kod}`}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow"
          >
            <div>
              <p className="font-medium text-slate-900">
                {e.tur} - {e.istasyon} - {e.kod}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                {e.marka} {e.model ? `· ${e.model}` : ""}
              </p>
            </div>
            {e.durum && (
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
                  e.durum === "Aktif"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {e.durum}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
