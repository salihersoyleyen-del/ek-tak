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

// Column background shades, consistent header-to-body down the whole column
const COL = {
  toplam: "bg-blue-100",
  toplamBody: "bg-white",
  aktif: "bg-green-400",
  tasarruf: "bg-green-100",
  pasif: "bg-red-300",
  insaat: "bg-amber-300",
  revizyon: "bg-sky-100",
  kritik: "bg-blue-200",
  engelli: "bg-blue-100",
};

function Cell({ durum }: { durum: string | null | undefined }) {
  const c = durum ? LEGEND_COLORS[durum] : undefined;
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

function CodeHeader({ label }: { label: string }) {
  return (
    <th className="border border-slate-200 bg-blue-100 p-0 text-center align-bottom">
      <div className="flex h-[70px] w-6 items-center justify-center overflow-hidden">
        <span
          className="whitespace-nowrap text-[9px]"
          style={{ transform: "rotate(-90deg)" }}
        >
          {label}
        </span>
      </div>
    </th>
  );
}

function AsansorlerView() {
  const d = data.asansorler;
  return (
    <div>
      <div className="mb-3 overflow-x-auto">
        <table className="border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[130px] border border-slate-200 bg-blue-100 px-2 py-1.5 text-left">
                İstasyon
              </th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.toplam}`}>Top.</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.aktif}`}>A</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.tasarruf}`}>T</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.pasif}`}>P</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.insaat}`}>İ</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.revizyon}`}>R</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.engelli}`}>E</th>
              {d.columns.map((c) => (
                <CodeHeader key={c} label={c} />
              ))}
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r) => (
              <tr key={r.kod}>
                <td className="sticky left-0 z-10 whitespace-nowrap border border-slate-200 bg-slate-50 px-2 py-1 font-medium">
                  {r.kod} {r.istasyon}
                </td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.toplamBody}`}>{r.toplam}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.aktif}`}>{r.aktif}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.tasarruf}`}>{r.tasarruf}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.pasif}`}>{r.pasif}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.insaat}`}>{r.insaat}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.revizyon}`}>{r.revizyon}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.engelli}`}>{r.engelli}</td>
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
              <td className="border border-slate-300 bg-slate-200" />
              <td className="border border-slate-300 bg-slate-200" colSpan={d.columns.length} />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-3 rounded-md border border-slate-200 bg-slate-100 p-3 text-xs">
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
  const d = data.yurutenMerdiven as any;
  const columns: string[] = d.columns;
  return (
    <div>
      <div className="mb-3 overflow-x-auto">
        <table className="border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[150px] border border-slate-200 bg-blue-100 px-2 py-1.5 text-left">
                İstasyon
              </th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.toplam}`}>Top.</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.aktif}`}>A</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.tasarruf}`}>T</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.pasif}`}>P</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.insaat}`}>İ</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.revizyon}`}>R</th>
              <th className={`border border-slate-200 px-1.5 py-1.5 ${COL.kritik}`}>K</th>
              {columns.map((c) => (
                <CodeHeader key={c} label={c} />
              ))}
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r: any) => (
              <tr key={r.kod}>
                <td className="sticky left-0 z-10 whitespace-nowrap border border-slate-200 bg-slate-50 px-2 py-1 font-medium">
                  {r.kod} {r.istasyon}
                </td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.toplamBody}`}>{r.toplam}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.aktif}`}>{r.aktif}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.tasarruf}`}>{r.tasarruf}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.pasif}`}>{r.pasif}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.insaat}`}>{r.insaat}</td>
                <td className={`border border-slate-200 px-1.5 text-center ${COL.revizyon}`}>{r.revizyon}</td>
                <td className={`border border-slate-200 px-1.5 text-center font-semibold ${COL.kritik}`}>
                  {r.kritik}
                </td>
                {r.hucreler.map((h: any, i: number) => (
                  <td key={i} className="border border-slate-200 p-0 text-center">
                    <Cell durum={h.durum} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="font-bold">
              <td className="sticky left-0 z-10 border border-slate-300 bg-slate-200 px-2 py-1">
                TOPLAM
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
              <td className="border border-slate-300 bg-slate-200 px-1.5 text-center">
                {d.hatToplami.kritik}
              </td>
              <td className="border border-slate-300 bg-slate-200" colSpan={columns.length} />
            </tr>
          </tbody>
        </table>
      </div>

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
