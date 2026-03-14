"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Search, Wand2, Tv, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [tag, setTag] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim().length > 2) {
      // Senin klasör yapın olan 'player' yoluna gönderiyor
      const cleanTag = tag.replace("#", "").toUpperCase();
      router.push(`/player/${cleanTag}`); 
    }
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen">
      <Navbar />
      <main className="relative pt-40 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <h1 className="text-6xl md:text-[8rem] font-[1000] italic uppercase tracking-tighter leading-none">
            ARENADA <span className="text-red-600">FARK</span> YARAT
          </h1>
        </div>

        {/* ANALİZ BARI */}
        <div className="max-w-3xl mx-auto relative z-50 mb-32">
          <form onSubmit={handleSearch} className="relative flex items-center bg-[#050a1a] border border-white/10 rounded-[2.2rem] p-2 shadow-2xl">
            <div className="pl-6 text-slate-600"><Search size={28} /></div>
            <input 
              type="text" value={tag} onChange={(e) => setTag(e.target.value)}
              placeholder="#V29R2QUCR" 
              className="flex-1 bg-transparent border-none outline-none px-6 font-black text-white text-xl placeholder:text-slate-800 uppercase focus:ring-0"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-12 py-5 rounded-[1.8rem] font-[1000] uppercase italic tracking-tighter transition-all">
              ANALİZ
            </button>
          </form>
        </div>

        {/* Diğer kutucuklar (Builder, TV, Pulse) burada devam ediyor... */}
      </main>
    </div>
  );
}