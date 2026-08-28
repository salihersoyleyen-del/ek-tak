"use client";

import { useMemo, useState } from "react";

export type BasitKayit = {
  id: string;
  baslik: string;
  altBaslik?: string;
  ekipmanKod?: string;
  satirlar: { etiket: string; deger: string | number | undefined }[];
};

export default function BasitKayitListesi({
  baslik,
  kayitlar,
}: {
  baslik: string;
  kayitlar: BasitKayit[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return kayitlar;
    const q = query.toLocaleLowerCase("tr-TR");
    return kayitlar.filter(
      (k) =>
        k.baslik.toLocaleLowerCase("tr-TR").includes(q) ||
        k.ekipmanKod?.toLocaleLowerCase("tr-TR").includes(q) ||
        k.altBaslik?.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [kayitlar, query]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">{baslik}</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ekipman koduna göre ara..."
        className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="mb-3 text-xs text-slate-400">{filtered.length} kayıt</p>
      <div className="space-y-3">
        {filtered.map((k) => (
          <div
            key={k.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-900">{k.baslik}</p>
            {k.altBaslik && (
              <p className="mt-0.5 text-xs text-slate-500">{k.altBaslik}</p>
            )}
            <div className="mt-2 space-y-1">
              {k.satirlar.map((s) => (
                <div
                  key={s.etiket}
                  className="flex justify-between text-xs"
                >
                  <span className="text-slate-400">{s.etiket}</span>
                  <span className="font-medium text-slate-900">
                    {s.deger ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
