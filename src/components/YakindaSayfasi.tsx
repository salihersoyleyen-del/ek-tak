export default function YakindaSayfasi({ baslik }: { baslik: string }) {
  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">{baslik}</h1>
      <div className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center">
        <i className="ti ti-clock text-2xl text-slate-300" aria-hidden="true" />
        <p className="mt-2 text-sm text-slate-400">
          Bu bölüm henüz eklenmedi, yakında.
        </p>
      </div>
    </div>
  );
}
