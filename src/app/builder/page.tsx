"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import BuilderControls from "@/components/builder/builder-controls";
import { fixCardData, calculateAvgElixir, calculateCycle } from "@/lib/cr-utils";
import { 
  User, RefreshCcw, Search, Database, Bot, 
  Trash2, LayoutGrid, Zap, Swords, Wand2 
} from "lucide-react";

export default function BuilderPage() {
  const [isAccountLinked, setIsAccountLinked] = useState(false); // Başlangıç: Standart Mod
  const [playerTag, setPlayerTag] = useState("V29R2QUCR");
  const [allCards, setAllCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [deck, setDeck] = useState<any[]>([]); 
  const [clanDecks, setClanDecks] = useState<any[][]>([[], [], [], []]);
  const [activeClanIndex, setActiveClanIndex] = useState(0);
  const [mode, setMode] = useState<"solo" | "clan">("solo");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("elixir-desc");
  const [loading, setLoading] = useState(false);

  // KARTLARI API'DEN ÇEKME VE GÖRSEL URL'LERİNİ DÜZENLEME
  const fetchCards = async (tag?: string) => {
    setLoading(true);
    try {
      const url = tag ? `/api/player/${tag.replace("#", "")}` : `/api/cards`; 
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.cards) {
        const fixed = data.cards.map((c: any) => {
          const card = fixCardData(c);
          
          // Kart görsellerini ID üzerinden dinamik ve güncel kaynaktan çekiyoruz
          const dynamicImageUrl = `https://statsroyale.com/images/cards/full/${card.id}.png`;

          return { 
            ...card, 
            iconUrls: { medium: dynamicImageUrl },
            // Standart modda seviyeyi 11'e sabitliyoruz
            displayLevel: !tag ? 11 : card.displayLevel 
          };
        });
        setAllCards(fixed);
        setFilteredCards(fixed);
      }
    } catch (err) {
      console.error("Kartlar yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCards(); }, []);

  const handleProfileAnalysis = () => {
    fetchCards(playerTag);
    setIsAccountLinked(true);
  };

  const switchToStandard = () => {
    setIsAccountLinked(false);
    fetchCards();
  };

  // FİLTRELEME VE SIRALAMA MANTIĞI
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

  const handleCardClick = (card: any) => {
    const isUsed = mode === "solo" ? deck.find(c => c.id === card.id) : clanDecks.some(d => d.find(c => c.id === card.id));
    if (isUsed) return;

    if (mode === "solo") {
      if (deck.length < 8) setDeck([...deck, card]);
    } else {
      const currentDeck = clanDecks[activeClanIndex];
      if (currentDeck.length < 8) {
        const newDecks = [...clanDecks];
        newDecks[activeClanIndex] = [...currentDeck, card];
        setClanDecks(newDecks);
      }
    }
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans">
      <Navbar />
      <main className="pt-24 pb-10 px-6 max-w-[1500px] mx-auto space-y-6">
        
        {/* ÜST PANEL: MOD SEÇİMİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div onClick={switchToStandard} className={`p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all ${!isAccountLinked ? 'bg-yellow-400/10 border-yellow-400/40' : 'bg-white/5 border-white/5 opacity-40'}`}>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400/20 p-3 rounded-2xl text-yellow-400"><Database size={20} /></div>
              <div>
                <h4 className="font-black italic uppercase text-base tracking-tighter">STANDART MOD</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">TÜM KARTLAR AÇIK (LVL 11)</p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-[2.5rem] border-2 transition-all ${isAccountLinked ? 'bg-red-600/10 border-red-600/30' : 'bg-[#0a1124] border-white/5'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-600/20 p-3 rounded-2xl text-red-600"><User size={20} /></div>
              <h4 className="font-black italic uppercase text-base tracking-tighter leading-none">PROFİL MODU</h4>
            </div>
            <div className="relative flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
                <Search className="ml-3 text-slate-700" size={16} />
                <input type="text" value={playerTag} onChange={(e) => setPlayerTag(e.target.value.toUpperCase())} className="flex-1 bg-transparent border-none outline-none px-3 font-black text-xs uppercase" placeholder="#TAG GİR" />
                <button onClick={handleProfileAnalysis} className="bg-red-600 hover:bg-red-500 px-6 py-2.5 rounded-lg font-black text-[10px]">{loading ? "..." : "ANALİZ"}</button>
            </div>
          </div>
        </div>

        {/* KÜTÜPHANE BAŞLIĞI VE SOLO/KLAN SEÇİMİ */}
        <div className="flex items-center justify-between bg-slate-900/40 p-5 rounded-[2.2rem] border border-white/5 shadow-2xl">
          <h2 className="text-lg font-black italic flex items-center gap-3 uppercase tracking-tighter">
            <LayoutGrid className="text-red-500" size={20}/> KART KÜTÜPHANESİ
          </h2>
          <div className="bg-black/40 p-1 rounded-xl border border-white/5 flex gap-1">
            <button onClick={() => setMode("solo")} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all ${mode === "solo" ? "bg-red-600 shadow-lg shadow-red-600/30" : "text-slate-500 hover:text-white"}`}><User size={12}/> SOLO</button>
            <button onClick={() => setMode("clan")} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase flex items-center gap-2 transition-all ${mode === "clan" ? "bg-red-600 shadow-lg shadow-red-600/30" : "text-slate-500 hover:text-white"}`}><Swords size={12}/> KLAN</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SOL: KART IZGARASI */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-8 gap-3 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCards.map((card) => {
                const isUsed = mode === "solo" ? deck.find(c => c.id === card.id) : clanDecks.some(d => d.find(c => c.id === card.id));
                return (
                  <div key={card.id} onClick={() => handleCardClick(card)} 
                    className={`group relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-300 ${card.displayLevel === 16 ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-white/10'} ${isUsed ? 'opacity-20 grayscale' : 'cursor-pointer hover:scale-105 active:scale-95'}`}>
                    <img 
                      src={card.iconUrls?.medium} 
                      className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-110" 
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://link.clashroyale.com/static/img/cards/unknown.png"; }}
                    />
                    <div className="absolute bottom-0 inset-x-0 p-1 bg-black/80 text-center border-t border-white/5 backdrop-blur-sm">
                      <span className={`text-[8px] font-[1000] italic ${card.displayLevel === 16 ? 'text-red-500' : 'text-slate-300'}`}>LVL {card.displayLevel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SAĞ: DESTE EDİTÖRÜ */}
          <div className="lg:col-span-4 space-y-4">
            <BuilderControls onFilterChange={setFilter} onSortChange={setSort} />
            <div className="bg-[#0a1124] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
              <div className="flex justify-between items-center px-1">
                <h4 className="text-[10px] font-black text-slate-600 uppercase italic tracking-[0.3em]">AKTİF DESTE</h4>
                <button onClick={() => mode === "solo" ? setDeck([]) : setClanDecks([[], [], [], []])} className="text-red-500 hover:rotate-180 transition-all p-1"><RefreshCcw size={18}/></button>
              </div>

              {mode === "solo" ? (
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-[3/4] rounded-lg bg-black/40 border border-white/5 relative overflow-hidden group">
                      {deck[i] ? (
                        <>
                          <img src={deck[i].iconUrls?.medium} className="w-full h-full object-contain p-1" />
                          <button onClick={() => setDeck(deck.filter(c => c.id !== deck[i].id))} className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20}/></button>
                        </>
                      ) : <Zap size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-white"/>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                   {clanDecks.map((cDeck, idx) => (
                    <div key={idx} onClick={() => setActiveClanIndex(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${activeClanIndex === idx ? 'bg-slate-800 border-red-600 shadow-xl' : 'bg-black/20 border-white/5 opacity-50 hover:opacity-100'}`}>
                      <div className="flex justify-between items-center mb-2 px-1">
                        <h4 className={`text-[8px] font-black uppercase ${activeClanIndex === idx ? 'text-red-500' : 'text-slate-500'}`}>DESTE {idx + 1}</h4>
                        {activeClanIndex === idx && <div className="text-[7px] bg-red-600 px-2 py-0.5 rounded-full font-black animate-pulse">AKTİF</div>}
                      </div>
                      <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="aspect-[3/4] rounded-md bg-black/40 border border-white/5 overflow-hidden">
                            {cDeck[i] ? <img src={cDeck[i].iconUrls?.medium} className="w-full h-full object-contain" /> : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* İKSİR VE DÖNGÜ HESABI */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <div className="bg-black/40 p-4 rounded-2xl text-center border border-white/5 group transition-all hover:border-yellow-400/30">
                  <p className="text-3xl font-[1000] italic text-yellow-400 leading-none">{calculateAvgElixir(mode === "solo" ? deck : clanDecks[activeClanIndex])}</p>
                  <p className="text-[8px] text-slate-600 font-bold uppercase mt-2 tracking-widest">İKSİR</p>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl text-center border border-white/5 group transition-all hover:border-white/20">
                  <p className="text-3xl font-[1000] italic text-white leading-none">{calculateCycle(mode === "solo" ? deck : clanDecks[activeClanIndex])}</p>
                  <p className="text-[8px] text-slate-600 font-bold uppercase mt-2 tracking-widest">DÖNGÜ</p>
                </div>
              </div>
            </div>

            {/* AI ANALİZ PANELİ */}
            <div className="bg-gradient-to-br from-red-950/20 to-[#0a1124] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-600/40 animate-pulse"><Bot size={20} /></div>
                 <div>
                    <h4 className="text-[10px] font-black italic uppercase tracking-widest leading-none">AI ANALİZ</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase mt-2">Sistem Çevrimiçi</p>
                 </div>
               </div>
               <Wand2 className="text-slate-700 hover:text-red-500 transition-colors cursor-pointer" size={18} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}