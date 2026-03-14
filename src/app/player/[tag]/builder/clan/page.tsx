"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fixCardData, calculateAvgElixir } from "@/lib/cr-utils";

export default function ClanWarBuilder() {
  const { tag } = useParams();
  const [allCards, setAllCards] = useState<any[]>([]);
  const [decks, setDecks] = useState<any[][]>([[], [], [], []]); // 4 Deste slotu
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);

  useEffect(() => {
    fetch(`/api/player/${tag}`).then(res => res.json()).then(data => {
      setAllCards(data.cards.map(fixCardData));
    });
  }, [tag]);

  const usedCardIds = decks.flat().map(c => c.id);

  const toggleCard = (card: any) => {
    const isUsedElsewhere = usedCardIds.includes(card.id) && !decks[activeDeckIdx].find(c => c.id === card.id);
    const inCurrent = decks[activeDeckIdx].find(c => c.id === card.id);

    if (inCurrent) {
      const newDecks = [...decks];
      newDecks[activeDeckIdx] = newDecks[activeDeckIdx].filter(c => c.id !== card.id);
      setDecks(newDecks);
    } else if (!isUsedElsewhere && decks[activeDeckIdx].length < 8) {
      const newDecks = [...decks];
      newDecks[activeDeckIdx] = [...newDecks[activeDeckIdx], card];
      setDecks(newDecks);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* DESTE SEÇİCİ TABLAR */}
      <div className="flex gap-4">
        {decks.map((d, i) => (
          <button 
            key={i} 
            onClick={() => setActiveDeckIdx(i)}
            className={`flex-1 p-6 rounded-[2rem] border-2 transition-all ${
              activeDeckIdx === i ? 'bg-blue-600 border-blue-400 shadow-xl' : 'bg-slate-900 border-white/5 text-slate-500'
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-1">DESTE {i + 1}</p>
            <p className="text-2xl font-black italic">{calculateAvgElixir(d)}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/30 p-8 rounded-[3rem] border border-white/5">
        <h2 className="text-xl font-black italic mb-8 uppercase text-slate-500">KART KOLEKSİYONUN</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4">
          {allCards.map(card => {
            const isUsedElsewhere = usedCardIds.includes(card.id) && !decks[activeDeckIdx].find(c => c.id === card.id);
            const isInThisDeck = decks[activeDeckIdx].find(c => c.id === card.id);
            
            return (
              <div 
                key={card.id} 
                onClick={() => !isUsedElsewhere && toggleCard(card)}
                className={`relative cursor-pointer transition-all ${
                    isUsedElsewhere ? 'opacity-20 grayscale scale-90' : 'hover:scale-110'
                } ${isInThisDeck ? 'ring-4 ring-yellow-500 rounded-xl scale-95' : ''}`}
              >
                <img src={card.iconUrls.medium} className="w-full rounded-xl" />
                <div className="absolute -top-2 -left-2 w-6 h-7 bg-blue-600 flex items-center justify-center" 
                     style={{ clipPath: 'polygon(50% 0%, 100% 60%, 85% 100%, 15% 100%, 0% 60%)' }}>
                  <span className="text-white font-black text-[8px] mt-1">{card.elixir}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}