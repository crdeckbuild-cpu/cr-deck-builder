import { Shield, Swords, Zap, Wind, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DeckAnalysis({ deck }: { deck: any[] }) {
  if (deck.length < 8) return (
    <div className="p-8 border border-dashed border-white/5 rounded-3xl text-center">
      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">
        Analiz için 8 kart seçmelisin ({deck.length}/8)
      </p>
    </div>
  );

  const stats = {
    airDefense: deck.filter(c => ["all", "air"].includes(c.target) || c.type === "spell").length,
    winCondition: deck.filter(c => ["Hog Rider", "Giant", "Golem", "Balloon", "Ram Rider", "Goblin Barrel", "Royal Giant"].includes(c.name)).length,
    spells: deck.filter(c => ["Spell", "spell"].includes(c.type) || c.name.includes("Spell")).length,
    avgLevel: (deck.reduce((sum, c) => sum + c.displayLevel, 0) / 8).toFixed(1)
  };

  return (
    <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">DESTE ANALİZİ</h3>
        <span className="text-[9px] font-bold text-blue-500">STATSROYALE ENGINE v1.0</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Hava Savunması */}
        <div className={`p-4 rounded-2xl flex items-center justify-between ${stats.airDefense < 3 ? 'bg-red-500/5 border border-red-500/10' : 'bg-green-500/5 border border-green-500/10'}`}>
          <div className="flex items-center gap-3">
            <Wind size={16} className={stats.airDefense < 3 ? 'text-red-500' : 'text-green-500'} />
            <span className="text-[10px] font-black uppercase">Hava Savunması</span>
          </div>
          {stats.airDefense < 3 ? <AlertTriangle size={14} className="text-red-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
        </div>

        {/* Atak Gücü (Win Condition) */}
        <div className={`p-4 rounded-2xl flex items-center justify-between ${stats.winCondition === 0 ? 'bg-yellow-500/5 border border-yellow-500/10' : 'bg-blue-500/5 border border-blue-500/10'}`}>
          <div className="flex items-center gap-3">
            <Swords size={16} className={stats.winCondition === 0 ? 'text-yellow-500' : 'text-blue-500'} />
            <span className="text-[10px] font-black uppercase">Atak Gücü</span>
          </div>
          <span className="text-[10px] font-black italic">{stats.winCondition > 0 ? 'İYİ' : 'ZAYIF'}</span>
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-2xl">
        <p className="text-[9px] text-slate-400 leading-relaxed italic uppercase font-medium">
          {stats.winCondition === 0 
            ? "⚠️ Bu destede net bir 'Win Condition' yok. Kule almakta zorlanabilirsin." 
            : "✅ Deste yapısı kule kuşatması için dengeli görünüyor."}
        </p>
      </div>
    </div>
  );
}