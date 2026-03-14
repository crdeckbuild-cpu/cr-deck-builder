"use client";
import { useState, useEffect, use } from "react";
import BuilderControls from "@/components/builder/builder-controls";
import { fixCardData, calculateAvgElixir, calculateCycle } from "@/lib/cr-utils";
// Hata veren yer burasıydı, Sparkles eklendi:
import { Sparkles, Trash2, RotateCcw } from "lucide-react"; 

export default function BuilderPage({ params }: any) {
  const { tag } = use(params);
  const [allCards, setAllCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [deck, setDeck] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("level-desc");

  // Kartları API'den Çek
  useEffect(() => {
    fetch(`/api/player/${tag}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cards) {
          const fixed = data.cards.map(fixCardData);
          setAllCards(fixed);
          setFilteredCards(fixed);
        }
      })
      .catch((err) => console.error("Kartlar yüklenemedi:", err));
  }, [tag]);

  // Filtreleme ve Sıralama Mantığı
  useEffect(() => {
    let result = [...allCards];
    
    if (filter === "crystal") {
      result = result.filter((c) => c.displayLevel === 16);
    } else if (filter !== "all") {
      result = result.filter((c) => c.rarity === filter);
    }

    result.sort((a, b) => {
      if (sort === "elixir-asc") return a.elixir - b.elixir;
      if (sort === "elixir-desc") return b.elixir - a.elixir;
      return b.displayLevel - a.displayLevel;
    });

    setFilteredCards(result);
  }, [filter, sort, allCards]);

  // Desteye Kart Ekleme
  const addToDeck = (card: any) => {
    if (deck.length < 8 && !deck.find((c) => c.id === card.id)) {
      setDeck([...deck, card]);
    }
  };

  // Desteden Kart Çıkarma
  const removeFromDeck = (cardId: string) => {
    setDeck(deck.filter((c) => c.id !== cardId));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-[1600px] mx-auto min-h-screen bg-slate-950 text-white">
      
      {/* SOL TARAF: Kart Havuzu */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="font-black text-2xl flex items-center gap-3 tracking-tighter">
            <Sparkles className="text-red-500 animate-pulse" /> 
            KART HAVUZU 
            <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full text-slate-400 font-bold">
              {filteredCards.length} KARAKTER
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10 gap-3">
          {filteredCards.map((card) => (
            <div 
              key={card.id} 
              onClick={() => addToDeck(card)}
              className={`group relative aspect-[3/4] cursor-pointer rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:scale-105 active:scale-95 
                ${card.displayLevel === 16 ? 'shadow-[0_0_15px_rgba(220,38,38,0.3)] border-red-500/40' : 'hover:border-white/20'}`}
            >
              <img src={card.iconUrls.medium} className="w-full h-full object-cover" alt={card.name} />
              
              {/* Seviye Etiketi */}
              <div className={`absolute bottom-0 left-0 right-0 py-1 text-[8px] font-black text-center backdrop-blur-md 
                ${card.displayLevel === 16 ? 'bg-red-600/80 text-white' : 'bg-black/80 text-slate-300'}`}>
                L {card.displayLevel}
              </div>

              {/* Seçilme Durumu Maskesi */}
              {deck.find(c => c.id === card.id) && (
                <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-[10px] font-black bg-white text-black px-2 py-1 rounded-lg shadow-xl">EKLEDİN</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SAĞ TARAF: Kontrol Paneli ve Analiz */}
      <div className="w-full lg:w-96 space-y-6">
        
        {/* Filtre ve AI Paneli */}
        <BuilderControls onFilterChange={setFilter} onSortChange={setSort} />
        
        {/* MEVCUT DESTE GÖRÜNÜMÜ */}
        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Desten ({deck.length}/8)</h4>
            <button 
              onClick={() => setDeck([])} 
              className="p-2 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors"
              title="Desteyi Sıfırla"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-lg bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
                {deck[i] ? (
                  <>
                    <img src={deck[i].iconUrls.medium} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeFromDeck(deck[i].id)}
                      className="absolute top-0 right-0 p-1 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={10} />
                    </button>
                  </>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/5" />
                )}
              </div>
            ))}
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Ort. İksir</p>
              <p className="text-2xl font-black text-white">{calculateAvgElixir(deck)}</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Döngü (4 Kart)</p>
              <p className="text-2xl font-black text-white">{calculateCycle(deck)}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}