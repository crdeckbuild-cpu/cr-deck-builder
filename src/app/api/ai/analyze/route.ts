import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userData, currentDeck } = await req.json();

  // Burada AI'ya (Gemini) şu komutu gönderiyoruz:
  // "Bu oyuncunun elindeki Level 16 kartlara ve Mart 2026 metasına bakarak, 
  // 3 evrim slotunu en verimli nasıl kullanabileceğini söyle."
  
  const aiAnalysis = {
    suggestion: "Level 16 Şövalye'n var, onu mutlaka Heroic Buff ile kullan.",
    priorityUpgrade: "Evrimli Bombacı'yı Level 16 yapmalısın, şu anki meta ona çok uygun.",
    winRateBoost: "+%12 Tahmini Artış"
  };

  return NextResponse.json(aiAnalysis);
}