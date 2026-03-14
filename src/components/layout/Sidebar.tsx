"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Wand2, BarChart3, Search, Settings, BookOpen, Tv, TrendingUp } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Ana Sayfa", href: "/", icon: <Home size={20}/>, desc: "Meta & Haberler" },
    { name: "Haberler", href: "/news", icon: <Newspaper size={20}/>, desc: "Sezon Analizleri" },
    { name: "Deste Kurucu", href: "/builder", icon: <Wand2 size={20}/>, desc: "AI Deste Oluştur" },
    { name: "CR-TV", href: "/tv", icon: <Tv size={20}/>, desc: "Trend Videolar" },
    { name: "Sosyal Nabız", href: "/pulse", icon: <TrendingUp size={20}/>, desc: "Trend Tartışmalar" },
    { name: "Oyuncu Ara", href: "/search", icon: <Search size={20}/>, desc: "Profil Sorgula" },
  ];

  return (
    <aside className="w-72 bg-[#020617] border-r border-white/5 min-h-screen p-6 flex flex-col sticky top-0 z-50 overflow-y-auto max-h-screen">
      <div className="mb-10 px-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-black italic shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">CR</div>
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            CR<span className="text-red-600">DECK</span><span className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Strateji</span>
          </h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                isActive 
                  ? "bg-red-600/10 border-red-500/20 text-white shadow-lg shadow-red-500/5" 
                  : "border-transparent text-slate-400 hover:bg-slate-900/50 hover:text-white"
              }`}
            >
              <div className={`p-2 rounded-xl border transition-all ${isActive ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20" : "bg-slate-900 border-white/5 group-hover:border-red-500/30 text-slate-500 group-hover:text-red-500"}`}>
                {item.icon}
              </div>
              <div>
                <span className="text-sm font-bold block leading-none mb-1">{item.name}</span>
                <span className="text-[9px] text-slate-600 font-medium group-hover:text-slate-500 transition-colors uppercase tracking-tight">{item.desc}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-3 mt-auto">
        <div className="bg-red-600/5 border border-red-500/10 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 shadow-lg shadow-red-500/10 animate-pulse">
            <BarChart3 size={18}/>
          </div>
          <div>
            <p className="text-[10px] font-black text-white uppercase italic leading-none">AI Stratejist</p>
            <p className="text-[8px] text-red-500 font-bold uppercase tracking-widest mt-1">Sistem Aktif</p>
          </div>
        </div>
      </div>
    </aside>
  );
}