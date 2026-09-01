export type Sekme = {
    slug: string;
    ad: string;
    icon: string;
    aktif: boolean; // true = has real functionality, false = placeholder
};

export const SEKMELER: Sekme[] = [
  { slug: "grafik-tablo", ad: "M8 YM AS Grafik Tablo", icon: "ti-table", aktif: true },
  { slug: "haftalik-performans", ad: "Haftalık performans", icon: "ti-chart-bar", aktif: true },
  { slug: "hakedisler", ad: "Hakedişler", icon: "ti-file-invoice", aktif: true },
  { slug: "ekipmanlar-ym", ad: "YM teknik bilgiler", icon: "ti-escalator", aktif: true },
  { slug: "kritik-ekipman", ad: "Kritik ekipman", icon: "ti-alert-octagon", aktif: false },
  { slug: "kritik-stok", ad: "Kritik stok listesi", icon: "ti-tool", aktif: true },
  { slug: "ekipmanlar-as", ad: "AS teknik bilgiler", icon: "ti-elevator", aktif: true },
  { slug: "yuklenici-karnesi", ad: "Yüklenici karnesi", icon: "ti-report", aktif: false },
  { slug: "asn-hasta-unite", ad: "ASN hasta ünite", icon: "ti-heart-broken", aktif: false },
  { slug: "ym-hasta-unite", ad: "YM hasta ünite", icon: "ti-heart-broken", aktif: false },
  { slug: "zincir-master", ad: "Ym zincir master M8", icon: "ti-chain", aktif: false },
  { slug: "el-bandi-takip", ad: "M8 el bandı takip", icon: "ti-hand-stop", aktif: false },
  { slug: "dof-takip", ad: "M8 DÖF takip", icon: "ti-clipboard-list", aktif: false },
  { slug: "el-bandi-cikma", ad: "El bandı çıkma olayı", icon: "ti-hand-stop", aktif: false },
  { slug: "zincir-degisim-sira", ad: "Zincir değişim sıra", icon: "ti-replace", aktif: false },
  { slug: "asn-ariza", ad: "ASN arıza liste", icon: "ti-alert-triangle", aktif: true },
  { slug: "ym-ariza", ad: "YM arıza liste", icon: "ti-alert-triangle", aktif: true },
  { slug: "muayene-ym", ad: "Muayene YM", icon: "ti-clipboard-check", aktif: false },
  { slug: "muayene-as", ad: "Muayene AS", icon: "ti-clipboard-check", aktif: false },
  { slug: "mahsur-kalma", ad: "Mahsur kalma", icon: "ti-elevator", aktif: true },
  ];

export function getSekme(slug: string) {
    return SEKMELER.find((s) => s.slug === slug);
}
