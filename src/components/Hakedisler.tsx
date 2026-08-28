"use client";

import { useState } from "react";
import type { Sozlesme } from "@/lib/data";

function formatTL(n?: number) {
  if (n == null) return "-";
  return `${n.toLocaleString("tr-TR")} ₺`;
}

export default function Hakedisler({
  sozlesmeler,
}: {
  sozlesmeler: Sozlesme[];
}) {
  const [tab, setTab] = useState<"aktif" | "gecmis">("aktif");
  const filtered = sozlesmeler.filter((s) =>
    tab === "aktif" ? s.aktif : !s.aktif
  );

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">
        Hakedişler
      </h1>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("aktif")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            tab === "aktif"
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-600"
          }`}
        >
          Mevcut sözleşme
        </button>
        <button
          onClick={() => setTab("gecmis")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            tab === "gecmis"
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-600"
          }`}
        >
          Sona ermiş sözleşmeler
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">
          Bu kategoride sözleşme yok.
        </p>
      )}

      {filtered.map((s) => {
        const toplamAy = s.aylikHakedis.length;
        const doluAy = s.aylikHakedis.filter((a) => a.tutar > 0).length;
        const yuzde = toplamAy > 0 ? Math.round((doluAy / 24) * 100) : 0;
        return (
          <div
            key={s.id}
            className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-900">
              {s.sozlesme}
            </p>
            <p className="mb-3 text-xs text-slate-500">{s.yuklenici}</p>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <p className="text-slate-400">Başlangıç</p>
                <p className="font-medium text-slate-900">{s.baslangic}</p>
              </div>
              <div>
                <p className="text-slate-400">Bitiş</p>
                <p className="font-medium text-slate-900">{s.bitis}</p>
              </div>
              <div>
                <p className="text-slate-400">Kalan gün</p>
                <p
                  className={`font-medium ${
                    s.aktif ? "text-green-600" : "text-slate-400"
                  }`}
                >
                  {s.kalanGun ?? 0} gün
                </p>
              </div>
              <div>
                <p className="text-slate-400">Sözleşme bedeli</p>
                <p className="font-medium text-slate-900">
                  {formatTL(s.sozlesmeBedeli)}
                </p>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-100 pt-2.5">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-slate-400">Hakediş ilerleme</span>
                <span className="font-medium text-slate-900">{yuzde}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${yuzde}%` }}
                />
              </div>
            </div>

            {s.aylikHakedis.length > 0 && (
              <div className="mt-3 border-t border-slate-100 pt-2.5">
                <p className="mb-1.5 text-xs text-slate-400">
                  Aylık hakediş dökümü
                </p>
                {s.aylikHakedis.map((a) => (
                  <div
                    key={a.ay}
                    className="flex justify-between border-t border-slate-50 py-1 text-xs first:border-t-0"
                  >
                    <span>{a.ay}</span>
                    <span className="font-medium">
                      {a.tutar.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
