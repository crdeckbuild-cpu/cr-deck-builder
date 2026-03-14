"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Swords, 
  LayoutGrid, 
  BarChart3, 
  Search,
  Settings
} from "lucide-react";

export default function PlayerNav({ tag }: { tag: string }) {
  const pathname = usePathname();

  const links = [
    { name: "PROFİL", href: `/player/${tag}`, icon: <User size={16}/> },
    { name: "SAVAŞLAR", href: `/player/${tag}/battles`, icon: <Swords size={16}/> },
    { name: "KOLEKSİYON", href: `/player/${tag}/cards`, icon: <LayoutGrid size={16}/> },
    { name: "İSTATİSTİK", href: `/player/${tag}/stats`, icon: <BarChart3 size={16}/> },
  ];

  return (
    <div className="w-full bg-[#020617] border-b border-white/5 px-8 py-6">
      <div className="max-w-[1540px] mx-auto flex items-center justify-between">
        
        {/* SOL: LOGO VE NAVİGASYON */}
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-black italic tracking-tighter text-white">
            CR<span className="text-red-600">DECK</span>
          </Link>

          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-[1.5rem] border border-white/5">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-2.5 rounded-2xl text-[10px] font-black transition-all flex items-center gap-2 uppercase tracking-widest ${
                    isActive 
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* SAĞ: AYARLAR VE PROFİL */}
        <div className="flex items-center gap-4">
          {/* ESKİ 'AI DESTE ÜRET' BUTONU BURADAYDI - KALDIRILDI */}
          
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Search size={18} />
            </button>
            <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
            <div className="w-1 bg-white/5 h-6 mx-2" />
            <div className="flex items-center gap-3 bg-white/5 pl-4 pr-2 py-1.5 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black text-slate-300">#{tag}</span>
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-red-600/20">
                {tag.substring(0, 1)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}