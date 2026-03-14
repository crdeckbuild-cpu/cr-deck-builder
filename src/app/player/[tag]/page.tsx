"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { tag } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/player/${tag}`).then(res => res.json()).then(setData);
    document.title = `Profil: ${tag} | CRDeckBuild`;
  }, [tag]);

  if (!data) return <div className="p-20 text-center text-slate-500 font-black animate-pulse">VERİLER ALINIYOR...</div>;

  return (
    <div className="bg-[#0b1224] p-8 md:p-12 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-12 opacity-5 hidden md:block">
        <h1 className="text-9xl font-black italic">{data.name}</h1>
      </div>
      <h3 className="text-5xl md:text-7xl font-black italic text-white uppercase mb-12 tracking-tighter">{data.name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox label="KUPA" val={data.trophies} sub="🏆" color="text-yellow-500" />
        <StatBox label="GALİBİYET" val={data.wins} color="text-green-400" />
        <StatBox label="BAĞIŞ" val={data.donations} color="text-blue-400" />
        <StatBox label="SEVİYE" val={data.expLevel} />
      </div>
    </div>
  );
}

function StatBox({ label, val, sub, color = "text-white" }: any) {
  return (
    <div className="bg-black/40 p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center hover:border-white/10 transition-colors">
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-4">{label}</p>
      <p className={`text-4xl font-black italic ${color}`}>{val} <span className="text-sm">{sub}</span></p>
    </div>
  );
}