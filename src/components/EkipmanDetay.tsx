"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";
import type { Ariza, Ekipman, MahsurKalma } from "@/lib/data";

export default function EkipmanDetay({
  ekipman,
  arizalar,
  mahsurlar,
}: {
  ekipman: Ekipman;
  arizalar: Ariza[];
  mahsurlar: MahsurKalma[];
}) {
  const [tab, setTab] = useState<"teknik" | "diger">("teknik");

  return (
    <div>
      <BackLink href="/" />
      <p className="text-lg font-semibold text-slate-900">{ekipman.kod}</p>
      <p className="mb-4 text-sm text-slate-500">
        {ekipman.tur} · {ekipman.marka}
        {ekipman.model ? ` ${ekipman.model}` : ""} · {ekipman.istasyon}
      </p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("teknik")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            tab === "teknik"
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-600"
          }`}
        >
          Teknik veri
        </button>
        <button
          onClick={() => setTab("diger")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            tab === "diger"
              ? "bg-blue-600 text-white"
              : "border border-slate-200 text-slate-600"
          }`}
        >
          Diğer veriler
        </button>
      </div>

      {tab === "teknik" ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="space-y-2.5">
            {Object.entries(ekipman.teknik).map(([key, value]) => (
              <div key={key} className="flex flex-wrap gap-x-1 text-sm">
                <span className="text-slate-500">{key}:</span>
                <span className="font-medium text-slate-900">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex justify-between border-t border-slate-100 py-1.5 text-sm first:border-t-0">
              <span>Arıza kayıtları</span>
              <span className="font-medium">{arizalar.length} kayıt</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 py-1.5 text-sm">
              <span>Mahsur kalma olayları</span>
              <span className="font-medium">{mahsurlar.length} kayıt</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 py-1.5 text-sm">
              <span>Muayene kayıtları</span>
              <span className="font-medium text-slate-400">yakında</span>
            </div>
          </div>

          {arizalar.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Arıza geçmişi
              </p>
              <div className="space-y-2">
                {arizalar.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-lg bg-slate-50 p-3 text-sm"
                  >
                    <p className="font-medium text-slate-900">
                      {a.bildirimTarihi} — {a.arizaTuru || "arıza"}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {a.aciklama} · Durum: {a.durum}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mahsurlar.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Mahsur kalma olayları
              </p>
              <div className="space-y-2">
                {mahsurlar.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg bg-slate-50 p-3 text-sm"
                  >
                    <p className="font-medium text-slate-900">{m.tarih}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Yolcu sayısı: {m.yolcuSayisi ?? "-"} · Süre:{" "}
                      {m.toplamSure ?? "-"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
