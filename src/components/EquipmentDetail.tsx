"use client";

import { useState } from "react";
import Link from "next/link";
import type { Equipment } from "@/lib/data";
import StatusBadge from "./StatusBadge";

const TABS = ["Genel", "Muayene", "Bakım", "Parçalar"] as const;
type Tab = (typeof TABS)[number];

const ADD_LABEL: Record<Exclude<Tab, "Genel">, string> = {
  Muayene: "Muayene Kaydı Ekle",
  Bakım: "Bakım Kaydı Ekle",
  Parçalar: "Parça Kaydı Ekle",
};

export default function EquipmentDetail({ equipment }: { equipment: Equipment }) {
  const [tab, setTab] = useState<Tab>("Genel");

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Ekipmanlar
      </Link>

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {equipment.ad}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Seri No: {equipment.seriNo}
          </p>
        </div>
        <StatusBadge durum={equipment.durum} />
      </div>

      <div className="mb-4 flex gap-6 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-1 pb-2 text-sm font-medium transition ${
              tab === t
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Genel" ? (
        <GeneralTab equipment={equipment} />
      ) : (
        <EmptyRecordsTab tab={tab} />
      )}
    </div>
  );
}

function GeneralTab({ equipment }: { equipment: Equipment }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Field label="Marka" value={equipment.marka} />
        <Field label="Model" value={equipment.model} />
        <Field label="Ekipman Türü" value={equipment.tur} />
        <Field label="Hat" value={equipment.hat} />
        <Field label="Konum" value={equipment.konum} />
        <Field label="Durum" value={equipment.durum} />
      </div>

      <h2 className="mb-3 mt-6 text-sm font-semibold text-slate-700">
        Ek Bilgiler
      </h2>
      <div className="space-y-2.5">
        {Object.entries(equipment.ekBilgiler).map(([key, value]) => (
          <div key={key} className="flex flex-wrap gap-x-1 text-sm">
            <span className="text-slate-500">{key}:</span>
            <span className="font-medium text-slate-900">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-900">{value || "-"}</p>
    </div>
  );
}

function EmptyRecordsTab({ tab }: { tab: Exclude<Tab, "Genel"> }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-500">0 kayıt</p>
        <button
          disabled
          title="Bu özellik yakında eklenecek"
          className="cursor-not-allowed rounded-lg bg-blue-600/50 px-4 py-2 text-sm font-medium text-white"
        >
          {ADD_LABEL[tab]}
        </button>
      </div>
      <div className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
        Henüz kayıt eklenmedi.
      </div>
    </div>
  );
}
