import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { cards } = await req.json();

    // 1. ADIM: KOD SEVİYEYE GÖRE SIRALAR (AI DEĞİL)
    const sorted = [...cards].sort((a: any, b: any) => b.level - a.level);

    const finalDecks = [];
    // 2. ADIM: İLK 32 KARTI (EN GÜÇLÜLER) 4 DESTE YAP
    for (let i = 0; i < 4; i++) {
      const deckCards = sorted.slice(i * 8, (i + 1) * 8);
      
      // 3. ADIM: İKSİRİ TOPLAT VE 8'E BÖLDÜR (TAM İSTEDİĞİN GİBİ)
      const totalElixir = deckCards.reduce((acc: number, curr: any) => acc + (curr.elixir || 3), 0);
      const avg = (totalElixir / 8).toFixed(1);

      // AI BURADA SADECE İSİM KOYUCU (KART VERİSİNE DOKUNAMAZ)
      finalDecks.push({
        deckName: `STRATEJİK DESTE ${i + 1}`,
        cards: deckCards,
        avgElixir: avg
      });
    }

    return NextResponse.json(finalDecks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}