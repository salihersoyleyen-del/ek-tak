import { getAllEquipment } from "@/lib/data";
import EquipmentList from "@/components/EquipmentList";

export default function Home() {
  const equipment = getAllEquipment();
  return <EquipmentList equipment={equipment} />;
}
