"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fixCardData } from "@/lib/cr-utils";
import { Swords, Trophy, Clock, User } from "lucide-react";

export default function BattleLogPage() {
  const { tag } = useParams();
  const [battles, setBattles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/player/${tag}/battles`)
      .then((res) => res.json())
      .then((data) => {
        setBattles(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tag]);

  if (loading) return <div className="p-20 text-center font-black italic animate-pulse text-slate-500 uppercase tracking-widest">SAVAŞ KAYITLARI ÇEKİLİYOR...</div>;
  
  if (battles.length === 0) return (
    <div className="p-20 text-center space-y-4">
      <Swords size={48} className="mx-auto text-slate-800" />
      <p className="font-black italic text-slate-500 uppercase">SAVAŞ VERİSİ BULUNAMADI</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500">
          <Swords size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">SAVAŞ GEÇMİŞİ</h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Son 25 Karşılaşma</p>
        </div>
      </div>

      <div className="space-y-4">
        {battles.map((battle, idx) => {
          const isWin = battle.team[0].crowns > battle.opponent[0].crowns;
          const isDraw = battle.team[0].crowns === battle.opponent[0].crowns;
          const battleType = battle.type.replace(/([A-Z])/g, ' $1').trim(); // "clanWarWarDay" -> "Clan War War Day"

          return (
            <div key={idx} className={`relative overflow-hidden bg-slate-900/40 border rounded-[2rem] transition-all hover:scale-[1.01] ${isWin ? 'border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]' : isDraw ? 'border-white/5' : 'border-red-500/20'}`}>
              
              {/* Sol Renk Çubuğu */}
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${isWin ? 'bg-green-500' : isDraw ? 'bg-slate-500' : 'bg-red-500'}`} />

              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* SOL: SAVAŞ TİPİ VE ZAMAN */}
                <div className="flex flex-col gap-1 w-full md:w-1/4">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isWin ? 'text-green-500' : 'text-slate-500'}`}>
                    {isWin ? 'GALİBİYET' : isDraw ? 'BERABERE' : 'MAĞLUBİYET'}
                  </span>
                  <h3 className="font-black italic text-sm uppercase truncate">{battleType}</h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase">{new Date(battle.battleTime).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>

                {/* ORTA: SKOR VE OYUNCULAR */}
                <div className="flex items-center justify-center gap-8 flex-1">
                  <div className="text-right">
                    <p className="text-xs font-black uppercase text-white truncate w-24 md:w-32">{battle.team[0].name}</p>
                    <p className="text-[10px] font-bold text-slate-500">Kupa: {battle.team[0].startingTrophies || '---'}</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="bg-black/50 px-4 py-2 rounded-xl border border-white/5 font-black italic text-xl tracking-tighter">
                      <span className={isWin ? 'text-green-500' : 'text-white'}>{battle.team[0].crowns}</span>
                      <span className="mx-2 text-slate-700">-</span>
                      <span className={!isWin && !isDraw ? 'text-red-500' : 'text-white'}>{battle.opponent[0].crowns}</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <p className="text-xs font-black uppercase text-white truncate w-24 md:w-32">{battle.opponent[0].name}</p>
                    <p className="text-[10px] font-bold text-slate-500">Kupa: {battle.opponent[0].startingTrophies || '---'}</p>
                  </div>
                </div>

                {/* SAĞ: KULLANILAN DESTE ÖNİZLEME */}
                <div className="flex -space-x-2 md:-space-x-4 overflow-hidden">
                  {battle.team[0].cards.slice(0, 8).map((card: any, i: number) => (
                    <img 
                      key={i} 
                      src={card.iconUrls.medium} 
                      alt={card.name} 
                      className="w-8 h-10 md:w-10 md:h-12 object-cover rounded-md border border-black/50 shadow-lg"
                    />
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}