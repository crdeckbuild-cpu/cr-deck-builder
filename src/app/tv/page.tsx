"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Tv, Youtube, Globe, Flame, Play, Clock, Share2 } from "lucide-react";

export default function TVPage() {
  // Örnek Video Verisi (Gerçekte YouTube API'den gelecek)
  const [videos] = useState([
    {
      id: "vid1",
      title: "YENİ EVRİM VE EFSANEVİ DESTE! - Sezon Başlangıcı",
      channel: "Türk Yayıncı 1",
      views: "25B İzlenme",
      time: "2 Saat Önce",
      thumbnail: "/vid-thumb-1.jpg",
      url: "https://youtube.com/watch?v=...",
      isLive: true,
      region: "TR"
    },
    {
      id: "vid2",
      title: "TOP 1 WORLD! NO ONE CAN STOP THIS DECK",
      channel: "ProPlayer Global",
      views: "120B İzlenme",
      time: "5 Saat Önce",
      thumbnail: "/vid-thumb-2.jpg",
      url: "https://youtube.com/watch?v=...",
      isLive: false,
      region: "INT"
    }
  ]);

  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex bg-[#020617] text-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 lg:p-12 space-y-10">
        
        {/* TV HEADER */}
        <section className="flex flex-col md:flex-row items-center justify-between bg-slate-900 border border-white/5 p-8 rounded-[3rem] shadow-2xl gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Tv size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">CR-TV <span className="text-red-600">CANLI</span></h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">En Popüler Yayıncılar & Taktik Videoları</p>
            </div>
          </div>
          
          {/* FİLTRELER */}
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 gap-1">
             <button onClick={() => setActiveTab("all")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all ${activeTab === "all" ? "bg-red-600 shadow-lg" : "text-slate-500"}`}><Flame size={14}/> Trend</button>
             <button onClick={() => setActiveTab("tr")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all ${activeTab === "tr" ? "bg-red-600 shadow-lg" : "text-slate-500"}`}>TR</button>
             <button onClick={() => setActiveTab("int")} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all ${activeTab === "int" ? "bg-red-600 shadow-lg" : "text-slate-500"}`}><Globe size={14}/> Global</button>
          </div>
        </section>

        {/* ÖNE ÇIKAN VİDEO (Büyük Ekran) */}
        <section className="relative aspect-video max-h-[500px] w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
           <img src="/featured-video.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Featured" />
           <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play fill="white" size={32} className="ml-1"/>
              </div>
           </div>
           <div className="absolute bottom-10 left-10 z-20 space-y-2">
              <span className="bg-red-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase animate-pulse">CANLI YAYIN</span>
              <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase drop-shadow-2xl">Dünya Şampiyonası Eleme Maçları</h3>
              <p className="text-sm text-slate-300 font-medium">Büyük Final Heyecanı Başladı! AI Tahminleri ile kazananı öğren.</p>
           </div>
        </section>

        {/* VİDEO IZGARASI */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-white/20 transition-all shadow-xl">
              <div className="relative aspect-video">
                <img src={video.thumbnail} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded-md text-[9px] font-bold text-white uppercase tracking-tighter">
                  {video.isLive ? "CANLI" : "VİDEO"}
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Youtube className="text-red-600" size={48} />
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex-shrink-0" />
                   <div className="space-y-1">
                      <h4 className="text-sm font-black italic leading-tight text-white group-hover:text-red-500 transition-colors line-clamp-2 uppercase tracking-tighter">{video.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">{video.channel}</p>
                   </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Play size={10}/> {video.views}</span>
                    <span className="flex items-center gap-1"><Clock size={10}/> {video.time}</span>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors"><Share2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}