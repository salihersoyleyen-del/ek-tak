"use client";

import { useState } from "react";
import data from "@/data/grafik-tablo.json";

const LEGEND_COLORS: Record<string, { bg: string; fg: string }> = {
  A: { bg: "#3fae4e", fg: "#ffffff" },
  P: { bg: "#e53935", fg: "#ffffff" },
  "İ": { bg: "#f5a623", fg: "#ffffff" },
  K: { bg: "#1c5fa8", fg: "#ffffff" },
  T: { bg: "#c8e6c9", fg: "#1b5e20" },
  R: { bg: "#bcd6ea", fg: "#0d3a5f" },
  S: { bg: "#9e9e9e", fg: "#ffffff" },
};

function Cell({ durum }: { durum: string }) {
  const c = LEGEND_COLORS[durum];
  if (!c) return <div className="h-6 w-6 shrink-0 bg-slate-900" />;
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold"
      style={{ background: c.bg, color: c.fg }}
    >
      {durum}
    </div>
  );
}

function CountBadge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-md px-2 py-1 text-center" style={{ background: color }}>
      <p className="text-[10px] text-white/90">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="mb-4 inline-block rounded-md border border-slate-200 bg-white p-2 text-xs">
      {data.legend.map((l) => (
        <div key={l.kod} className="flex items-center gap-2 py-0.5">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-sm text-[10px] font-bold text-white"
            style={{ background: l.renk }}
          >
            {l.kod}
          </span>
          <span className="text-slate-700">{l.ad}</span>
        </div>
      ))}
    </div>
  );
}

function GaranteBanner() {
  return (
    <div className="mt-4 rounded-md bg-yellow-300 py-3 text-center text-sm font-bold text-slate-900">
      {data.garantiBitis}
    </div>
  );
}

function AsansorlerView() {
  const d = data.asansorler;
  return (
    <div>
      <div className="mb-3 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[130px] border border-slate-200 bg-blue-100 px-2 py-1.5 text-left">
                İstasyon
              </th>
              <th className="border border-slate-200 bg-green-200 px-1.5 py-1.5">T</th>
              <th className="border border-slate-200 bg-green-400 px-1.5 py-1.5">A</th>
              <th className="border border-slate-200 bg-green-100 px-1.5 py-1.5">Tas.</th>
              <th className="border border-slate-200 bg-red-300 px-1.5 py-1.5">P</th>
              <th className="border border-slate-200 bg-amber-300 px-1.5 py-1.5">İnş.</th>
              <th className="border border-slate-200 bg-sky-100 px-1.5 py-1.5">Rev.</th>
              <th className="border border-slate-200 bg-blue-100 px-1.5 py-1.5">Eng.</th>
              {d.columns.map((c) => (
                <th
                  key={c}
                  className="border border-slate-200 bg-blue-100 px-1 py-1.5 text-center"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r) => (
              <tr key={r.kod}>
                <td className="sticky left-0 z-10 whitespace-nowrap border border-slate-200 bg-slate-50 px-2 py-1 font-medium">
                  {r.kod} {r.istasyon}
                </td>
                <td className="border border-slate-200 px-1.5 text-center">{r.toplam}</td>
                <td className="border border-slate-200 bg-green-50 px-1.5 text-center">{r.aktif}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.tasarruf}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.pasif}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.insaat}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.revizyon}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.engelli}</td>
                {r.hucreler.map((h, i) => (
                  <td key={i} className="border border-slate-200 p-0 text-center">
                    <Cell durum={h} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="font-bold">
              <td className="sticky left-0 z-10 border border-slate-300 bg-slate-200 px-2 py-1">
                HAT TOPLAMI
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.toplam}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.aktif}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.tasarruf}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.pasif}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.insaat}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.revizyon}
              </td>
              <td className="border border-slate-300 bg-slate-200" colSpan={8} />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-3 rounded-md border border-slate-200 bg-white p-3 text-xs">
        <p className="mb-1 font-medium">D00 Yerleşke(BE)</p>
        <p className="text-slate-500">
          Toplam {d.d00.toplam} · Aktif {d.d00.aktif} · İnşaat Halinde {d.d00.insaat}
        </p>
        <p className="mt-2 font-medium">GENEL TOPLAM</p>
        <p className="text-slate-500">
          Toplam {d.genelToplam.toplam} · Aktif {d.genelToplam.aktif} · Tasarruf{" "}
          {d.genelToplam.tasarruf} · İnşaat {d.genelToplam.insaat}
        </p>
      </div>

      <Legend />
      <GaranteBanner />
    </div>
  );
}

function YurutenMerdivenView() {
  const d = data.yurutenMerdiven;
  const maxCols = Math.max(...d.rows.map((r) => r.hucreler.length));
  return (
    <div>
      <div className="mb-3 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[150px] border border-slate-200 bg-blue-100 px-2 py-1.5 text-left">
                İstasyon
              </th>
              <th className="border border-slate-200 bg-green-400 px-1.5 py-1.5">A</th>
              <th className="border border-slate-200 bg-green-100 px-1.5 py-1.5">Tas.</th>
              <th className="border border-slate-200 bg-red-300 px-1.5 py-1.5">P</th>
              <th className="border border-slate-200 bg-amber-300 px-1.5 py-1.5">İnş.</th>
              <th className="border border-slate-200 bg-blue-200 px-1.5 py-1.5">Krt.</th>
              {Array.from({ length: maxCols }).map((_, i) => (
                <th key={i} className="border border-slate-200 bg-blue-100 px-1 py-1.5 text-center">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r) => (
              <tr key={r.kod}>
                <td className="sticky left-0 z-10 whitespace-nowrap border border-slate-200 bg-slate-50 px-2 py-1 font-medium">
                  {r.kod} {r.istasyon}
                </td>
                <td className="border border-slate-200 bg-green-50 px-1.5 text-center">{r.aktif}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.tasarruf}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.pasif}</td>
                <td className="border border-slate-200 px-1.5 text-center">{r.insaat}</td>
                <td className="border border-slate-200 bg-blue-50 px-1.5 text-center font-semibold text-blue-800">
                  {r.kritik}
                </td>
                {Array.from({ length: maxCols }).map((_, i) => {
                  const h = r.hucreler[i];
                  return (
                    <td key={i} className="border border-slate-200 p-0 text-center">
                      {h ? <Cell durum={h.durum} /> : <div className="h-6 w-6 bg-slate-900" />}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="font-bold">
              <td className="sticky left-0 z-10 border border-slate-300 bg-slate-200 px-2 py-1">
                TOPLAM
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.aktif}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.tasarruf}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.pasif}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.insaat}
              </td>
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.kritik}
              </td>
              <td className="border border-slate-300 bg-slate-200" colSpan={maxCols} />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-3 text-xs text-slate-400">
        Not: Kritik ekipman hücreleri Google Sheets kaynağından görsel olarak eşleştirildi; hatalı
        bir hücre görürsen söyle, hemen düzeltirim.
      </p>

      <Legend />
      <GaranteBanner />
    </div>
  );
}

export default function GrafikTablo() {
  const [tab, setTab] = useState<"as" | "ym">("ym");

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold text-slate-900">
        M8 YM AS Grafik Tablo
      </h1>
      <p className="mb-4 text-xs text-slate-400">Güncelleme: {data.guncelleme}</p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("ym")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "ym"
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-600"
          }`}
        >
          Yürüyen Merdivenler
        </button>
        <button
          onClick={() => setTab("as")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "as"
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-600"
          }`}
        >
          Asansörler
        </button>
      </div>

      {tab === "ym" ? <YurutenMerdivenView /> : <AsansorlerView />}
    </div>
  );
}
