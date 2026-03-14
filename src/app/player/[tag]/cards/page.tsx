"use client";
import { useState, useEffect, use, useMemo } from "react";
import BuilderControls from "@/components/builder/builder-controls";
import { fixCardData, calculateAvgElixir, calculateCycle } from "@/lib/cr-utils";
import { 
  Wand2, Trash2, RotateCcw, LayoutGrid, Zap, Bot, 
  Droplets, RefreshCw, Swords, User, ExternalLink, Share2 
} from "lucide-react"; // <-- BURASI DÜZELTİLDİ

export default function UnifiedStrategyPage({ params }: any) {
  const { tag } = use(params);
  const [allCards, setAllCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [deck, setDeck] = useState<any[]>([]); 
  const [clanDecks, setClanDecks] = useState<any[][]>([[], [], [], []]);
  const [activeClanIndex, setActiveClanIndex] = useState(0);
  const [mode, setMode] = useState<"solo" | "clan">("solo");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("elixir-desc");

  useEffect(() => {
    fetch(`/api/player/${tag}`).then(res => res.json()).then(data => {
      if (data.cards) {
        const fixed = data.cards.map(fixCardData);
        setAllCards(fixed);
        setFilteredCards(fixed);
      }
    });
  }, [tag]);

  useEffect(() => {
    let result = [...allCards];
    if (filter === "crystal") result = result.filter(c => c.displayLevel === 16);
    else if (filter !== "all") result = result.filter(c => c.rarity === filter);

    result.sort((a, b) => {
      if (sort === "elixir-asc") return a.elixir - b.elixir;
      if (sort === "elixir-desc") return b.elixir - a.elixir;
      return b.displayLevel - a.displayLevel;
    });
    setFilteredCards(result);
  }, [filter, sort, allCards]);

  const generateAIDeck = () => {
    const sorted = [...allCards].sort((a, b) => b.displayLevel - a.displayLevel);
    if (mode === "solo") {
      setDeck(sorted.slice(0, 8));
    } else {
      setClanDecks([
        sorted.slice(0, 8),
        sorted.slice(8, 16),
        sorted.slice(16, 24),
        sorted.slice(24, 32)
      ]);
    }
  };

  const handleCardClick = (card: any) => {
    if (mode === "solo") {
      if (deck.length < 8 && !deck.find(c => c.id === card.id)) setDeck([...deck, card]);
    } else {
      const currentDeck = clanDecks[activeClanIndex];
      const isUsedElsewhere = clanDecks.some(d => d.find(c => c.id === card.id));
      if (currentDeck.length < 8 && !isUsedElsewhere) {
        const newDecks = [...clanDecks];
        newDecks[activeClanIndex] = [...currentDeck, card];
        setClanDecks(newDecks);
      }
    }
  };

  const exportToCR = (targetDeck: any[]) => {
    if (targetDeck.length < 8) return alert("Deste 8 kart olmalı!");
    const ids = targetDeck.map(c => c.id).join(";");
    window.open(`https://link.clashroyale.com/deck/en?deck=${ids}`, "_blank");
  };

  const handleShare = async (targetDeck: any[]) => {
    if (targetDeck.length < 8) return alert("Deste henüz tamamlanmadı!");
    const ids = targetDeck.map(c => c.id).join(";");
    const shareLink = `https://link.clashroyale.com/deck/en?deck=${ids}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      alert("Deste linki panoya kopyalandı!");
    } catch (err) {
      alert("Kopyalama işlemi başarısız.");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-8 min-h-screen bg-[#020617] text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SOL: KOLEKSİYON */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between bg-slate-900/40 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h2 className="text-xl font-black italic flex items-center gap-3 uppercase tracking-tighter">
              <LayoutGrid className="text-red-500"/> Koleksiyonun
            </h2>
            <div className="flex gap-3">
               <div className="bg-black/40 p-1.5 rounded-2xl border border-white/5 flex gap-1">
                  <button onClick={() => setMode("solo")} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all ${mode === "solo" ? "bg-red-600 shadow-lg" : "text-slate-500 hover:text-white"}`}><User size={14}/> Bireysel</button>
                  <button onClick={() => setMode("clan")} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all ${mode === "clan" ? "bg-red-600 shadow-lg" : "text-slate-500 hover:text-white"}`}><Swords size={14}/> Klan</button>
               </div>
               <button onClick={generateAIDeck} className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg shadow-purple-500/30 active:scale-95 transition-all"><Wand2 size={14}/> AI ÖNERİSİ</button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {filteredCards.map((card) => {
              const isUsed = mode === "solo" ? deck.find(c => c.id === card.id) : clanDecks.some(d => d.find(c => c.id === card.id));
              return (
                <div key={card.id} onClick={() => handleCardClick(card)} className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border transition-all duration-300 ${card.displayLevel === 16 ? 'border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'border-white/10'} ${isUsed ? 'opacity-30 grayscale cursor-not-allowed' : 'cursor-pointer hover:border-white/40'}`}>
                  <img src={card.iconUrls?.medium} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/70 backdrop-blur-sm text-center">
                    <span className={`text-[9px] font-black italic ${card.displayLevel === 16 ? 'text-red-500' : 'text-white'}`}>LVL {card.displayLevel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SAĞ: DESTE PANELLERİ */}
        <div className="w-full lg:w-96 space-y-4">
          <BuilderControls onFilterChange={setFilter} onSortChange={setSort} />

          {mode === "solo" ? (
            <div className="bg-slate-900 border border-white/10 p-6 rounded-[2.5rem] shadow-xl space-y-5">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-[10px] font-black text-slate-500 uppercase italic">Aktif Deste</h4>
                <button onClick={() => setDeck([])} className="text-red-500 hover:rotate-180 transition-all"><RotateCcw size={16}/></button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-xl bg-black/40 border border-white/5 relative overflow-hidden group">
                    {deck[i] ? (
                      <>
                        <img src={deck[i].iconUrls?.medium} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[7px] text-center font-bold text-red-500">L{deck[i].displayLevel}</div>
                        <button onClick={() => setDeck(deck.filter(c => c.id !== deck[i].id))} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                      </>
                    ) : <Zap size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"/>}
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 p-3 rounded-2xl text-center border border-white/5"><p className="text-[8px] text-slate-500 font-bold uppercase mb-1">İksir</p><p className="text-xl font-black">{calculateAvgElixir(deck)}</p></div>
                  <div className="bg-white/5 p-3 rounded-2xl text-center border border-white/5"><p className="text-[8px] text-slate-500 font-bold uppercase mb-1">Döngü</p><p className="text-xl font-black">{calculateCycle(deck)}</p></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => exportToCR(deck)} className="bg-red-600 hover:bg-red-500 p-3 rounded-2xl text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all active:scale-95"><ExternalLink size={14}/> Aktar</button>
                  <button onClick={() => handleShare(deck)} className="bg-slate-800 hover:bg-slate-700 p-3 rounded-2xl text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all active:scale-95"><Share2 size={14}/> Paylaş</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {clanDecks.map((cDeck, idx) => (
                <div key={idx} 
                  onClick={() => setActiveClanIndex(idx)}
                  className={`p-5 rounded-[2.5rem] border transition-all cursor-pointer ${activeClanIndex === idx ? 'bg-slate-800 border-red-500 shadow-xl' : 'bg-slate-900/60 border-white/5 opacity-80'}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className={`text-[10px] font-black uppercase italic ${activeClanIndex === idx ? 'text-red-500' : 'text-slate-500'}`}>DESTE {String.fromCharCode(65 + idx)}</h4>
                    {activeClanIndex === idx && <div className="text-[8px] bg-red-500 px-2 py-0.5 rounded-full font-black animate-pulse uppercase">Aktif</div>}
                  </div>
                  <div className="grid grid-cols-8 gap-1 mb-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="aspect-[3/4] rounded-lg bg-black/40 border border-white/5 relative overflow-hidden group">
                        {cDeck[i] ? (
                          <>
                            <img src={cDeck[i].iconUrls?.medium} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[5px] text-center text-red-500 font-bold">L{cDeck[i].displayLevel}</div>
                            <button onClick={(e) => { e.stopPropagation(); const nd = [...clanDecks]; nd[idx] = nd[idx].filter(c => c.id !== cDeck[i].id); setClanDecks(nd); }} className="absolute inset-0 bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={10}/></button>
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><p className="text-[7px] text-slate-500 font-bold uppercase tracking-tighter">İksir: {calculateAvgElixir(cDeck)}</p></div>
                    <div className="bg-white/5 p-2 rounded-xl text-center border border-white/5"><p className="text-[7px] text-slate-500 font-bold uppercase tracking-tighter">Döngü: {calculateCycle(cDeck)}</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={(e) => { e.stopPropagation(); exportToCR(cDeck); }} className="bg-red-600 hover:bg-red-500 p-2 rounded-xl text-[8px] font-black uppercase flex items-center justify-center gap-1 transition-all"><ExternalLink size={12}/> Aktar</button>
                    <button onClick={(e) => { e.stopPropagation(); handleShare(cDeck); }} className="bg-slate-700 hover:bg-slate-600 p-2 rounded-xl text-[8px] font-black uppercase flex items-center justify-center gap-1 transition-all"><Share2 size={12}/> Paylaş</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI GÖZLEMCİ (TARİH) */}
          <div className="bg-red-600/5 border border-red-500/10 p-5 rounded-[2.5rem] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10"><Bot size={22}/></div>
              <span className="text-[10px] font-black uppercase italic tracking-widest">AI Gözlemci</span>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-slate-500 font-black uppercase mb-0.5">Son Analiz</p>
              <p className="text-[10px] text-slate-300 font-bold italic">14 Mart 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}