"use client";
import Sidebar from "@/components/layout/Sidebar";
import { 
  MessageSquare, TrendingUp, Twitter, MessageCircle, 
  AlertTriangle, Heart, Hash, Bot, Sparkles 
} from "lucide-react";

export default function SocialPulsePage() {
  // AI tarafından sosyal medyadan derlenmiş örnek trendler
  const trends = [
    { id: 1, topic: "Evrimleşmiş Havan", sentiment: "negative", volume: "12K+", reason: "Menzil ve hasar dengesizliği tartışılıyor." },
    { id: 2, topic: "Mega Şövalye Buff?", sentiment: "positive", volume: "8K+", reason: "Yeni sezonda güçleneceği söylentisi heyecan yarattı." },
    { id: 3, topic: "2.6 Hog Cycle", sentiment: "neutral", volume: "5K+", reason: "Hala en çok tartışılan ve kullanılan klasik deste." }
  ];

  return (
    <div className="flex bg-[#020617] text-white">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 lg:p-12 space-y-10">
        
        {/* HEADER: AI ANALİZ DURUMU */}
        <header className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Bot size={150} className="text-red-500" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 bg-red-600/10 w-fit px-4 py-1.5 rounded-full border border-red-500/20">
              <Sparkles size={14} className="text-red-500 animate-pulse"/>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">AI Sosyal Gözlemci Aktif</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Topluluk <span className="text-red-600">Ne Konuşuyor?</span></h2>
            <p className="text-sm text-slate-400 max-w-xl font-medium">Yapay zekamız son 24 saatte Reddit, X ve Discord üzerinde paylaşılan 50.000'den fazla mesajı analiz ederek Clash Royale dünyasının nabzını tuttu.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SOL: TREND LİSTESİ */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black italic flex items-center gap-3 uppercase tracking-tighter">
              <TrendingUp className="text-red-500"/> Popüler Başlıklar
            </h3>
            <div className="grid gap-4">
              {trends.map((trend) => (
                <div key={trend.id} className="bg-slate-900/60 border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group hover:border-red-500/30 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-red-500 border border-white/5 group-hover:scale-110 transition-transform">
                      <Hash size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black italic text-white uppercase tracking-tight">{trend.topic}</h4>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{trend.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-white">{trend.volume}</div>
                    <div className={`text-[8px] font-black uppercase tracking-tighter mt-1 ${trend.sentiment === 'negative' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {trend.sentiment === 'negative' ? '⚠️ Tepki Alıyor' : '🔥 Beğeni Topluyor'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ: AI GENEL YORUMU */}
          <div className="space-y-6">
            <h3 className="text-xl font-black italic flex items-center gap-3 uppercase tracking-tighter">
              <Bot className="text-red-500"/> AI Özet Yorumu
            </h3>
            <div className="bg-red-600/5 border border-red-500/10 p-8 rounded-[3rem] space-y-6 relative">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"/>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Canlı Analiz</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                  "Şu an global toplulukta bariz bir 'Havan' gerginliği var. Reddit'teki 'Nerf' talepleri son 3 saatte %40 arttı. Öte yandan, klan savaşlarındaki ödül sistemiyle ilgili olumlu bir hava esiyor. Stratejik olarak, deste kurarken hava savunmasına ağırlık vermeniz sosyal medyadaki yeni meta sızıntılarına göre mantıklı görünüyor."
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Topluluk Moral Seviyesi</span>
                  <span className="text-white">%64 (Stabil)</span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 w-[64%] shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                </div>
              </div>
            </div>

            {/* PLATFORM DURUMLARI */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-900 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                 <Twitter className="text-blue-400" size={18}/>
                 <span className="text-[10px] font-bold">X Trendi</span>
               </div>
               <div className="bg-slate-900 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                 <MessageSquare className="text-orange-500" size={18}/>
                 <span className="text-[10px] font-bold">Reddit</span>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}