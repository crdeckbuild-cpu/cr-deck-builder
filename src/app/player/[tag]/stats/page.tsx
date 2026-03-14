"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BarChart3, TrendingUp, Target, Zap, Award, ShieldCheck } from "lucide-react";

export default function StatsPage() {
  const { tag } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tag) return;
    
    // Profil verilerini çekiyoruz
    fetch(`/api/player/${tag}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tag]);

  if (loading) return (
    <div className="p-20 text-center animate-pulse">
      <p className="font-black italic text-slate-500 uppercase tracking-[0.5em]">İSTATİSTİKLER ANALİZ EDİLİYOR...</p>
    </div>
  );

  if (!data || data.error) return (
    <div className="p-20 text-center text-red-500 font-black uppercase">
      VERİ ÇEKİLEMEDİ. API ANAHTARINI VEYA OYUNCU TAG'İNİ KONTROL ET.
    </div>
  );

  // Kazanma oranı hesaplama
  const totalGames = data.wins + data.losses;
  const winRate = totalGames > 0 ? ((data.wins / totalGames) * 100).toFixed(1) : "0";

  const statCards = [
    { label: "KAZANMA ORANI", value: `%${winRate}`, icon: <TrendingUp className="text-green-500" />, desc: "Genel Galibiyet Yüzdesi" },
    { label: "ÜÇ TAÇ ZAFERİ", value: data.threeCrownWins, icon: <Target className="text-red-500" />, desc: "Tam Galibiyet Sayısı" },
    { label: "TOPLAM BAĞIŞ", value: data.donations, icon: <Award className="text-blue-500" />, desc: "Klan Yardımlaşması" },
    { label: "EN YÜKSEK KUPA", value: data.bestTrophies, icon: <Zap className="text-yellow-500" />, desc: "Kariyer Rekoru" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* BAŞLIK ALANI */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
            DETAYLI <span className="text-yellow-500 text-5xl italic block md:inline">İSTATİSTİKLER</span>
          </h1>
          <p className="text-slate-500 text-xs font-black tracking-[0.3em] mt-4 uppercase flex items-center gap-2">
            <ShieldCheck size={14} /> PROFESYONEL OYUNCU ANALİZİ
          </p>
        </div>
        <div className="bg-slate-900/80 px-6 py-3 rounded-2xl border border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">GÜNCEL LİG</p>
          <p className="text-xl font-black italic text-white uppercase">{data.arena?.name || "BİLİNMİYOR"}</p>
        </div>
      </div>

      {/* İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="group bg-[#0b1222] border border-white/5 p-8 rounded-[2.5rem] transition-all hover:bg-white/[0.02] hover:border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-6 bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-4xl font-black italic tracking-tighter mb-2">{stat.value}</p>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{stat.desc}</p>
            </div>
            {/* Arka plan süsü */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <BarChart3 size={120} />
            </div>
          </div>
        ))}
      </div>

      {/* ALT BİLGİ ALANI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 p-10 rounded-[3rem]">
          <h3 className="text-xl font-black italic uppercase mb-4">Savaş Performansı</h3>
          <div className="flex gap-10">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">GALİBİYET</p>
              <p className="text-3xl font-black italic">{data.wins}</p>
            </div>
            <div className="border-l border-white/10 pl-10">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">MAĞLUBİYET</p>
              <p className="text-3xl font-black italic">{data.losses}</p>
            </div>
            <div className="border-l border-white/10 pl-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TOPLAM</p>
              <p className="text-3xl font-black italic">{totalGames}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[3rem] flex flex-col justify-center items-center text-center">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">KLAN</p>
             <p className="text-2xl font-black italic uppercase leading-tight">{data.clan?.name || "KLANSIZ"}</p>
             <p className="text-[9px] font-bold text-slate-600 mt-2">#{data.clan?.tag?.replace("#", "") || ""}</p>
        </div>
      </div>
    </div>
  );
}