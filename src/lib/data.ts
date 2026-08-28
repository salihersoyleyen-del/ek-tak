import rawData from "@/data/equipment.json";

export type Equipment = {
  id: string;
  tur: string; // "Yürüyen Merdiven/Bant" | "Asansör"
  ad: string;
  seriNo: string;
  konum: string;
  hat: string;
  istasyon: string;
  durum: "Aktif" | "Pasif";
  marka?: string;
  model?: string;
  ekBilgiler: Record<string, string | number>;
};

const equipment = rawData as unknown as Equipment[];

export function getAllEquipment(): Equipment[] {
  return equipment;
}

export function getEquipmentById(id: string): Equipment | undefined {
  return equipment.find((e) => e.id === id);
}

export function getCounts() {
  const total = equipment.length;
  const active = equipment.filter((e) => e.durum === "Aktif").length;
  const passive = total - active;
  return { total, active, passive };
}

export function searchEquipment(query: string): Equipment[] {
  if (!query.trim()) return equipment;
  const q = query.toLocaleLowerCase("tr-TR");
  return equipment.filter((e) => {
    return (
      e.ad.toLocaleLowerCase("tr-TR").includes(q) ||
      e.seriNo.toLocaleLowerCase("tr-TR").includes(q) ||
      e.konum.toLocaleLowerCase("tr-TR").includes(q) ||
      e.istasyon.toLocaleLowerCase("tr-TR").includes(q)
    );
  });
}
