import { notFound } from "next/navigation";
import { getAllEquipment, getEquipmentById } from "@/lib/data";
import EquipmentDetail from "@/components/EquipmentDetail";

export function generateStaticParams() {
  return getAllEquipment().map((e) => ({ id: e.id }));
}

export default function EquipmentPage({
  params,
}: {
  params: { id: string };
}) {
  const equipment = getEquipmentById(params.id);
  if (!equipment) return notFound();
  return <EquipmentDetail equipment={equipment} />;
}
