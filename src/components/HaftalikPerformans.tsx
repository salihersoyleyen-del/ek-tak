"use client";

import { useState } from "react";

type Metric = { metrik: string; degerler: Record<string, number> };

const HIGHLIGHT_AMBER = new Set([
  "YOLCU GÖZÜNDE EMREAMADELİK PERFORMANSI",
  "REVİZYONSUZ EMREAMADELİK PERFORMANSI",
]);
const HIGHLIGHT_GREEN = new Set(["NORMAL EMREAMADELİK PERFORMANSI"]);

function formatValue(metrik: string, v: number | undefined) {
  if (v === undefined) return "-";
  if (metrik.includes("YÜZDESİ") || metrik.includes("PERFORMANSI")) {
    return `${(v * 100).toFixed(v * 100 % 1 === 0 ? 0 : 2)}%`;
  }
  return String(v);
}

function Block({
  title,
  metrics,
  hafta,
  colorBg,
  colorText,
}: {
  title: string;
  metrics: Metric[];
  hafta: string;
  colorBg: string;
  colorText: string;
}) {
  return (
    <div className="flex">
      <div
        className="flex w-9 shrink-0 items-center justify-center py-2 text-center text-xs font-medium"
        style={{
          background: colorBg,
          color: colorText,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        {title}
      </div>
      <div className="flex-1">
        {metrics.map((m) => {
          const isAmber = HIGHLIGHT_AMBER.has(m.metrik);
          const isGreen = HIGHLIGHT_GREEN.has(m.metrik);
          const bg = isAmber ? "#FAEEDA" : isGreen ? "#EAF3DE" : undefined;
          const fg = isAmber ? "#412402" : isGreen ? "#173404" : undefined;
          return (
            <div
              key={m.metrik}
              className="flex border-t border-slate-100 text-xs"
              style={bg ? { background: bg } : undefined}
            >
              <div
                className="flex-1 px-2 py-1.5 capitalize"
                style={fg ? { color: fg } : undefined}
              >
                {m.metrik.toLocaleLowerCase("tr-TR")}
              </div>
              <div
                className="w-[70px] shrink-0 border-l border-slate-100 px-2 py-1.5 text-center font-medium"
                style={fg ? { color: fg } : undefined}
              >
                {formatValue(m.metrik, m.degerler[hafta])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HaftalikPerformans({
  haftalar,
  asansor,
  yurutenMerdiven,
}: {
  haftalar: string[];
  asansor: Metric[];
  yurutenMerdiven: Metric[];
}) {
  const sonHafta = haftalar[haftalar.length - 1];
  const [secili, setSecili] = useState(sonHafta);
  const reversed = [...haftalar].reverse();
  const kisaEtiket = (h: string) => h.split(" ")[0].replace(".", ". ");

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">
        Haftalık Performans
      </h1>

      <div className="mb-3 rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
        <p className="text-xs text-slate-400">Seçili hafta</p>
        <p className="mt-1 text-lg font-semibold text-slate-900">{secili}</p>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {reversed.map((h) => (
          <button
            key={h}
            onClick={() => setSecili(h)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium ${
              secili === h
                ? "bg-blue-600 text-white"
                : "border border-slate-200 text-slate-600"
            }`}
          >
            {kisaEtiket(h)}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="flex text-center text-xs font-medium">
          <div className="flex-1 py-2" style={{ background: "#FBEAF0", color: "#4B1528" }}>
            Hafta
          </div>
          <div className="w-[70px] border-l border-slate-100 py-2" style={{ background: "#EAF3DE", color: "#173404" }}>
            {kisaEtiket(secili)}
          </div>
        </div>
        <div className="flex text-center text-xs">
          <div className="flex-1 py-1.5" style={{ background: "#FBEAF0", color: "#4B1528" }}>
            Firma
          </div>
          <div className="w-[70px] border-l border-slate-100 py-1.5" style={{ background: "#EAF3DE", color: "#173404" }}>
            OTIS
          </div>
        </div>
        <Block
          title="Asansör"
          metrics={asansor}
          hafta={secili}
          colorBg="#E6F1FB"
          colorText="#042C53"
        />
        <Block
          title="Yürüyen merdiven"
          metrics={yurutenMerdiven}
          hafta={secili}
          colorBg="#FAECE7"
          colorText="#4A1B0C"
        />
      </div>
    </div>
  );
}
