import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> } // Next.js 15 Promise yapısı
) {
  // 1. URL parametrelerini asenkron olarak çözüyoruz
  const resolvedParams = await params;
  const tag = resolvedParams.tag;

  // 2. Etiketi API'nin anlayacağı formata getiriyoruz (# işaretini temizle)
  const cleanTag = tag.replace("#", "").toUpperCase();
  const apiToken = process.env.CLASH_ROYALE_API_KEY;

  // 3. API Key kontrolü (Eğer .env dosyasında yoksa hata döndürür)
  if (!apiToken) {
    console.error("HATA: .env dosyasında CLASH_ROYALE_API_KEY tanımlı değil!");
    return NextResponse.json({ error: "API Key eksik" }, { status: 500 });
  }

  try {
    // 4. Resmi Clash Royale API'sine istek atıyoruz
    // URL'de %23 ifadesi '#' işaretini temsil eder
    const res = await fetch(
      `https://api.clashroyale.com/v1/players/%23${cleanTag}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        // Veriyi 30 saniyede bir tazele (Performans için önemli)
        next: { revalidate: 30 }
      }
    );

    // 5. API'den gelen yanıtın durumunu kontrol et
    if (!res.ok) {
      const errorData = await res.json();
      console.error("CR API Yanıt Vermedi:", errorData);
      return NextResponse.json(
        { error: "Oyuncu bulunamadı veya API hatası", details: errorData }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    
    // 6. Temiz veriyi frontend'e gönder
    return NextResponse.json(data);

  } catch (error) {
    console.error("Sunucu Hatası:", error);
    return NextResponse.json(
      { error: "İstek sırasında bir hata oluştu" }, 
      { status: 500 }
    );
  }
}