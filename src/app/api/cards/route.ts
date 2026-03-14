import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.clashroyale.com/v1/cards", {
      headers: {
        Authorization: `Bearer ${process.env.CR_API_KEY}`,
      },
      next: { revalidate: 3600 } 
    });
    
    const data = await res.json();
    
    // Görselleri otomatik düzeltiyoruz
    const fixedCards = (data.items || []).map((card: any) => ({
      ...card,
      iconUrls: {
        // Eğer API'den gelen görsel açılmazsa diye StatsRoyale linkini oluşturuyoruz
        medium: `https://statsroyale.com/images/cards/full/${card.id}.png`,
        original: card.iconUrls.medium // Orijinalini de yedek olarak tutalım
      }
    }));

    return NextResponse.json({ cards: fixedCards });
  } catch (error) {
    return NextResponse.json({ error: "Kartlar çekilemedi" }, { status: 500 });
  }
}