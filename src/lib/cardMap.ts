export function getCardImage(cardName: string): string {
  if (!cardName) return "/assets/cards/unknown.png";

  // API'den gelen ismi temizle: "P.E.K.K.A" -> "pekka", "Giant Skeleton" -> "giant-skeleton"
  const formattedName = cardName
    .toLowerCase()
    .replace(/\./g, '')           // Noktaları kaldır
    .replace(/'/g, '')            // Tek tırnakları kaldır
    .replace(/\s+/g, '-')         // Boşlukları tire yap
    .replace(/[^a-z0-9-]/g, '');  // Diğer her şeyi temizle

  // Özel durum düzeltmesi (Bazı kartlar klasörde farklı isimlendirilmiş olabilir)
  const manualOverrides: { [key: string]: string } = {
    "mega-knight": "mega-knight",
    "the-log": "the-log",
    "mini-pekka": "mini-pekka"
  };

  const finalName = manualOverrides[formattedName] || formattedName;

  return `/assets/cards/${finalName}.png`;
}