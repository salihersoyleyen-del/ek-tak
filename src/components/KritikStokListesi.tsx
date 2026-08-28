"use client";

import { useMemo, useState } from "react";
import type { KritikStok } from "@/lib/data";

export default function KritikStokListesi({ stok }: { stok: KritikStok[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return stok;
    const q = query.toLocaleLowerCase("tr-TR");
    return stok.filter(
      (s) =>
        s.malzemeAdi.toLocaleLowerCase("tr-TR").includes(q) ||
        s.ekipmanTipi?.toLocaleLowerCase("tr-TR").includes(q) ||
        s.ekipmanMarka?.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [stok, query]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">
        Kritik Stok Listesi
      </h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Malzeme adı veya ekipman tipine göre ara..."
        className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="mb-3 text-xs text-slate-400">{filtered.length} malzeme</p>
      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <p className="text-sm font-medium text-slate-900">
                {s.malzemeAdi}
              </p>
              {s.fiyatEuro != null && (
                <span className="text-sm font-medium text-slate-900">
                  {s.fiyatEuro} €
                </span>
              )}
            </div>
            <p className="mb-2 mt-1 text-xs text-slate-500">
              {s.ekipmanTipi} · {s.ekipmanMarka} {s.ekipmanModeli}
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Ünitedeki miktarı</span>
              <span className="font-medium text-slate-900">
                {s.unitedekiMiktar} {s.miktarBirimi}
              </span>
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-slate-500">
                Bulunması gereken kritik miktar
              </span>
              <span className="font-medium text-red-600">
                {s.kritikBulundurulmasiGereken} adet
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
