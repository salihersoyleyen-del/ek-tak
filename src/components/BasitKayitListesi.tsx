"use client";

import { useMemo, useState } from "react";

export type BasitKayit = {
  id: string;
  baslik: string;
  altBaslik?: string;
  ekipmanKod?: string;
  ts?: number; // sıralama için epoch ms, en yeni önce
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
  const [secilenKod, setSecilenKod] = useState<string | null>(null);

  const sirali = useMemo(
    () => [...kayitlar].sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0)),
    [kayitlar]
  );

  const filtered = useMemo(() => {
    if (secilenKod) {
      return sirali.filter((k) => k.ekipmanKod === secilenKod);
    }
    if (!query.trim()) return sirali;
    const q = query.toLocaleLowerCase("tr-TR");
    return sirali.filter(
      (k) =>
        k.baslik.toLocaleLowerCase("tr-TR").includes(q) ||
        k.ekipmanKod?.toLocaleLowerCase("tr-TR").includes(q) ||
        k.altBaslik?.toLocaleLowerCase("tr-TR").includes(q)
    );
  }, [sirali, query, secilenKod]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">{baslik}</h1>

      {secilenKod ? (
        <button
          onClick={() => setSecilenKod(null)}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Tüm kayıtlar
        </button>
      ) : (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ekipman koduna göre ara..."
          className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}

      <p className="mb-3 text-xs text-slate-400">
        {secilenKod ? `${secilenKod} · ` : ""}
        {filtered.length} kayıt
      </p>
      <div className="space-y-3">
        {filtered.map((k) => (
          <button
            key={k.id}
            onClick={() => k.ekipmanKod && setSecilenKod(k.ekipmanKod)}
            disabled={!k.ekipmanKod}
            className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow disabled:cursor-default disabled:hover:border-slate-200 disabled:hover:shadow-sm"
          >
            <p className="text-sm font-medium text-slate-900">{k.baslik}</p>
            {k.altBaslik && (
              <p className="mt-0.5 text-xs text-slate-500">{k.altBaslik}</p>
            )}
            <div className="mt-2 space-y-1">
              {k.satirlar.map((s) => (
                <div key={s.etiket} className="flex justify-between text-xs">
                  <span className="text-slate-400">{s.etiket}</span>
                  <span className="font-medium text-slate-900">
                    {s.deger ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
