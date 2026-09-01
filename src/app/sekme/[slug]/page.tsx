import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import GrafikTablo from "@/components/GrafikTablo";
import EkipmanListesi from "@/components/EkipmanListesi";
import KritikStokListesi from "@/components/KritikStokListesi";
import HaftalikPerformans from "@/components/HaftalikPerformans";
import Hakedisler from "@/components/Hakedisler";
import BasitKayitListesi, {
    type BasitKayit,
} from "@/components/BasitKayitListesi";
import YakindaSayfasi from "@/components/YakindaSayfasi";
import { SEKMELER, getSekme } from "@/lib/sekmeler";
import {
    getAllEkipman,
    getAsnAriza,
    getYmAriza,
    getMahsurKalma,
    getKritikStok,
    getSozlesmeler,
    getHaftalikPerformans,
} from "@/lib/data";

export function generateStaticParams() {
    return SEKMELER.map((s) => ({ slug: s.slug }));
}

export default function SekmePage({ params }: { params: { slug: string } }) {
    const sekme = getSekme(params.slug);
    if (!sekme) return notFound();

  const wrapped = (children: React.ReactNode) => (
        <div>
              <BackLink />
          {children}
        </div>div>
      );
  
    switch (sekme.slug) {
      case "grafik-tablo":
              return wrapped(<GrafikTablo />);
      case "ekipmanlar-ym": {
              const list = getAllEkipman().filter(
                        (e) => e.tur === "Yürüyen Merdiven/Bant"
                                );
              return wrapped(
                        <EkipmanListesi equipment={list} baslik="YM Teknik Bilgiler" />
                      );
      }
      case "ekipmanlar-as": {
              const list = getAllEkipman().filter((e) => e.tur === "Asansör");
              return wrapped(
                        <EkipmanListesi equipment={list} baslik="AS Teknik Bilgiler" />
                      );
      }
      case "kritik-stok":
              return wrapped(<KritikStokListesi stok={getKritikStok()} />);
      case "haftalik-performans": {
              const d = getHaftalikPerformans();
              return wrapped(
                        <HaftalikPerformans
                                    haftalar={d.haftalar}
                                    asansor={d.asansor}
                                    yurutenMerdiven={d.yurutenMerdiven}
                                  />
                      );
      }
      case "hakedisler":
              return wrapped(<Hakedisler sozlesmeler={getSozlesmeler()} />);
      case "asn-ariza": {
              const kayitlar: BasitKayit[] = getAsnAriza().map((a) => ({
                        id: a.id,
                        baslik: `${a.ekipmanKod} — ${a.arizaTuru || "arıza"}`,
                        altBaslik: a.aciklama,
                        ekipmanKod: a.ekipmanKod,
                        satirlar: [
                          { etiket: "Bildirim", deger: a.bildirimTarihi },
                          { etiket: "Durum", deger: a.durum },
                          { etiket: "Firma", deger: a.firma },
                          { etiket: "Toplam süre", deger: a.toplamSure },
                                  ],
              }));
              return wrapped(
                        <BasitKayitListesi baslik="ASN Arıza Liste" kayitlar={kayitlar} />
                      );
      }
      case "ym-ariza": {
              const kayitlar: BasitKayit[] = getYmAriza().map((a) => ({
                        id: a.id,
                        baslik: `${a.ekipmanKod} — ${a.arizaTuru || "arıza"}`,
                        altBaslik: a.aciklama,
                        ekipmanKod: a.ekipmanKod,
                        satirlar: [
                          { etiket: "Bildirim", deger: a.bildirimTarihi },
                          { etiket: "Durum", deger: a.durum },
                          { etiket: "Firma", deger: a.firma },
                          { etiket: "Toplam süre", deger: a.toplamSure },
                                  ],
              }));
              return wrapped(
                        <BasitKayitListesi baslik="YM Arıza Liste" kayitlar={kayitlar} />
                      );
      }
      case "mahsur-kalma": {
              const kayitlar: BasitKayit[] = getMahsurKalma().map((m) => ({
                        id: m.id,
                        baslik: `${m.ekipmanKod} — ${m.tarih ?? ""}`,
                        altBaslik: m.istasyon,
                        ekipmanKod: m.ekipmanKod,
                        satirlar: [
                          { etiket: "Yolcu sayısı", deger: m.yolcuSayisi },
                          { etiket: "Toplam süre", deger: m.toplamSure },
                          { etiket: "Kök sebep", deger: m.kokSebep },
                                  ],
              }));
              return wrapped(
                        <BasitKayitListesi baslik="Mahsur Kalma" kayitlar={kayitlar} />
                      );
      }
      default:
              return wrapped(<YakindaSayfasi baslik={sekme.ad} />);
    }
}
</div>
