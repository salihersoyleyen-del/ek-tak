import { notFound } from "next/navigation";
import {
  getAllEkipman,
  getArizaByKod,
  getEkipmanByKod,
  getMahsurByKod,
} from "@/lib/data";
import EkipmanDetay from "@/components/EkipmanDetay";

export function generateStaticParams() {
  return getAllEkipman().map((e) => ({ kod: e.kod.split("/") }));
}

export default function EkipmanPage({
  params,
}: {
  params: { kod: string[] };
}) {
  const kod = params.kod.join("/");
  const ekipman = getEkipmanByKod(kod);
  if (!ekipman) return notFound();
  const arizalar = getArizaByKod(kod);
  const mahsurlar = getMahsurByKod(kod);
  return (
    <EkipmanDetay ekipman={ekipman} arizalar={arizalar} mahsurlar={mahsurlar} />
  );
}
