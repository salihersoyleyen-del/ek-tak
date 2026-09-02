import ymRaw from "@/data/ym.json";
import asRaw from "@/data/as.json";
import kritikStokRaw from "@/data/kritik-stok.json";
import hakedislerRaw from "@/data/hakedisler.json";
import haftalikRaw from "@/data/haftalik-performans.json";
import asnArizaRaw from "@/data/asn-ariza.json";
import ymArizaRaw from "@/data/ym-ariza.json";
import mahsurRaw from "@/data/mahsur.json";

export type Ekipman = {
  id: string;
  kod: string;
  tur: string;
  hat: string;
  istasyon: string;
  marka?: string;
  model?: string;
  durum?: string;
  teknik: Record<string, string | number>;
};

export type Ariza = {
  id: string;
  ekipmanKod: string;
  istasyon?: string;
  bildirimTarihi?: string;
  durum?: string;
  aciklama?: string;
  servisDisiNedeni?: string;
  firma?: string;
  toplamSure?: string | number;
  arizaTuru?: string;
};

export type MahsurKalma = {
  id: string;
  ekipmanKod: string;
  tarih?: string;
  istasyon?: string;
  yolcuSayisi?: number;
  toplamSure?: string | number;
  kokSebep?: string;
  cozumOnerisi?: string;
};

export type KritikStok = {
  id: string;
  hat?: string;
  ekipmanTipi?: string;
  ekipmanMarka?: string;
  ekipmanModeli?: string;
  malzemeAdi: string;
  sapKodu?: string;
  unitedekiMiktar?: number;
  miktarBirimi?: string;
  kritikEkipmanSayisi?: number;
  kritikBulundurulmasiGereken?: number;
  fiyatEuro?: number;
};

export type Sozlesme = {
  id: string;
  sistem?: string;
  hat?: string;
  sozlesme: string;
  sozlesmeNo?: string;
  tur?: string;
  yuklenici?: string;
  baslangic?: string;
  bitis?: string;
  kalanGun?: number;
  aktif: boolean;
  sozlesmeBedeli?: number;
  yillikBedel?: number;
  aylikHakedis: { ay: string; tutar: number }[];
  sozlesmeSuresiAy?: number;
};

const ym = ymRaw as unknown as Ekipman[];
const asEquip = (asRaw as unknown as Ekipman[]);
const allEkipman: Ekipman[] = [...ym, ...asEquip];

export function getAllEkipman() {
  return allEkipman;
}

export function getEkipmanByKod(kod: string) {
  return allEkipman.find((e) => e.kod === kod);
}

export function searchEkipman(query: string) {
  if (!query.trim()) return allEkipman;
  const q = query.toLocaleLowerCase("tr-TR");
  return allEkipman.filter(
    (e) =>
      e.kod.toLocaleLowerCase("tr-TR").includes(q) ||
      e.istasyon?.toLocaleLowerCase("tr-TR").includes(q) ||
      e.hat?.toLocaleLowerCase("tr-TR").includes(q)
  );
}

export function getEkipmanCounts() {
  const total = allEkipman.length;
  const ymCount = ym.length;
  const asCount = asEquip.length;
  return { total, ymCount, asCount };
}

export function getArizaByKod(kod: string): Ariza[] {
  const all = [...(asnArizaRaw as unknown as Ariza[]), ...(ymArizaRaw as unknown as Ariza[])];
  return all.filter((a) => a.ekipmanKod === kod);
}

export function getMahsurByKod(kod: string): MahsurKalma[] {
  return (mahsurRaw as unknown as MahsurKalma[]).filter((m) => m.ekipmanKod === kod);
}

export function getAsnAriza(): Ariza[] {
  return asnArizaRaw as unknown as Ariza[];
}

export function getYmAriza(): Ariza[] {
  return ymArizaRaw as unknown as Ariza[];
}

export function getMahsurKalma(): MahsurKalma[] {
  return mahsurRaw as unknown as MahsurKalma[];
}

export function getKritikStok(): KritikStok[] {
  return kritikStokRaw as unknown as KritikStok[];
}

export function searchKritikStok(query: string) {
  const all = getKritikStok();
  if (!query.trim()) return all;
  const q = query.toLocaleLowerCase("tr-TR");
  return all.filter(
    (s) =>
      s.malzemeAdi.toLocaleLowerCase("tr-TR").includes(q) ||
      s.ekipmanTipi?.toLocaleLowerCase("tr-TR").includes(q) ||
      s.ekipmanMarka?.toLocaleLowerCase("tr-TR").includes(q)
  );
}

export function getSozlesmeler(): Sozlesme[] {
  return hakedislerRaw as unknown as Sozlesme[];
}

export function getHaftalikPerformans(): {
  haftalar: string[];
  asansor: { metrik: string; degerler: Record<string, number> }[];
  yurutenMerdiven: { metrik: string; degerler: Record<string, number> }[];
} {
  return haftalikRaw as any;
}
