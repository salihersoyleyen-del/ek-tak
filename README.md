# Ekipman Takip

M8 Hattı yürüyen merdiven/bant ve asansör envanterini listeleyen bir Next.js uygulaması.
Veriler `M8_YM_AS_(1).xlsx` dosyasından üretilmiştir (`src/data/equipment.json`).

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:3000 adresini açın.

## Vercel'e deploy etme

1. Bu klasörü bir GitHub deposuna yükleyin (veya `vercel` CLI ile doğrudan deploy edin).
2. https://vercel.com adresinde "Add New Project" ile depoyu seçin, ayar değiştirmeden "Deploy" deyin.
   - Framework otomatik olarak Next.js algılanır, ek yapılandırma gerekmez.
3. Ya da CLI ile:
   ```bash
   npm install -g vercel
   vercel
   ```

## Veriyi güncelleme

Yeni bir Excel dosyası geldiğinde `src/data/equipment.json` dosyasının yeniden
üretilmesi gerekir. Yeni bir Excel geldiğinde bana iletirsen json'u güncelleyip
sana teslim ederim.

## Şu an neler var / neler yok

- Ekipman listesi, arama (ad/seri no/konum), Toplam/Aktif/Pasif sayaçları ✅
- Ekipman detay sayfası: Genel bilgiler + Ek Bilgiler ✅
- Muayene / Bakım / Parçalar sekmeleri arayüzde duruyor ama şu an **salt görüntüleme**
  (kayıt ekleme/düzenleme butonları pasif) — veritabanı bağlanınca aktif edilecek.
- Ekipman ekleme/düzenleme henüz yok.

Bu özellikler ileride, istenirse eklenebilir (örn. değişen parça takibi için
checkbox'lar, kayıt geçmişi, veritabanı entegrasyonu vb.).
