import Link from "next/link";
import { SEKMELER } from "@/lib/sekmeler";

export default function Home() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-slate-900">
        M8 Hattı Ekipman Takip
      </h1>
      <p className="mb-6 text-sm text-slate-500">Bir kategori seçin</p>

      <div className="grid grid-cols-2 gap-3">
        {SEKMELER.map((s) => (
          <Link
            key={s.slug}
            href={`/sekme/${s.slug}`}
            className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow"
          >
            <i className={`ti ${s.icon} text-2xl text-blue-600`} aria-hidden="true" />
            <p className="mt-2 text-sm font-medium text-slate-900">{s.ad}</p>
            {!s.aktif && (
              <p className="mt-0.5 text-xs text-slate-400">yakında</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
