"use client";
import Navbar from "@/components/layout/Navbar";
import { Newspaper, Calendar, ArrowRight, TrendingUp } from "lucide-react";

export default function NewsPage() {
  const news = [
    { title: "SEZON 56: EJDERHA YILI BAŞLIYOR", date: "12 Mart 2026", cat: "Güncelleme", img: "bg-red-600/20" },
    { title: "YENİ EVRİM: HAVAN ARTIK DAHA GÜÇLÜ!", date: "10 Mart 2026", cat: "Dengeleme", img: "bg-yellow-400/20" },
    { title: "PROFESYONEL LİG SONUÇLARI AÇIKLANDI", date: "08 Mart 2026", cat: "E-Spor", img: "bg-blue-600/20" },
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="space-y-4 mb-16 text-center md:text-left">
          <div className="flex items-center gap-2 text-red-500 font-black italic uppercase text-xs justify-center md:justify-start">
            <TrendingUp size={16} /> ARENA GÜNCELİ
          </div>
          <h1 className="text-4xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">
            HABERLER & <span className="text-red-600">SIZINTILAR</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <div key={i} className="group bg-[#0a1124] border border-white/5 rounded-[3.5rem] overflow-hidden hover:border-red-600/40 transition-all shadow-2xl flex flex-col">
              <div className={`h-56 ${n.img} relative flex items-center justify-center`}>
                <Newspaper size={64} className="text-white/10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-6 left-6 bg-red-600 text-[9px] font-black uppercase px-3 py-1 rounded-full italic tracking-widest shadow-lg shadow-red-600/20">
                  {n.cat}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold mb-4 uppercase italic">
                  <Calendar size={12} /> {n.date}
                </div>
                <h3 className="text-xl font-black italic uppercase leading-tight mb-6 group-hover:text-red-500 transition-colors">
                  {n.title}
                </h3>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group-hover:translate-x-2 transition-transform">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Devamını Oku</span>
                  <ArrowRight size={18} className="text-red-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}