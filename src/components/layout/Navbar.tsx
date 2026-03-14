"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Newspaper, Wand2, Tv, TrendingUp, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Ana Sayfa", href: "/", icon: <Home size={18}/> },
    { name: "Haberler", href: "/news", icon: <Newspaper size={18}/> },
    { name: "Deste Kurucu", href: "/builder", icon: <Wand2 size={18}/> },
    { name: "CR-TV", href: "/tv", icon: <Tv size={18}/> },
    { name: "Sosyal Nabız", href: "/pulse", icon: <TrendingUp size={18}/> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
      <div className="max-w-[1540px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* LOGO: Görseldeki gibi yayık ve sarı */}
          <Link href="/" className="flex flex-col select-none group">
            <span className="text-3xl font-[1000] italic tracking-tighter text-white leading-none">
              CR<span className="text-red-600">DECK</span>
            </span>
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.55em] mt-1 leading-none block w-full">
              BUILD
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-red-600/5 border border-red-500/10 px-4 py-2 rounded-2xl">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">AI STRATEJİST AKTİF</span>
        </div>
      </div>

      {/* MOBİL MENÜ PANELİ */}
      <div className={`absolute top-full left-0 right-0 bg-[#020617] border-b border-white/10 transition-all duration-300 ${isOpen ? 'max-h-[600px] opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="max-w-[1540px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-4 p-5 rounded-[2rem] border transition-all ${pathname === item.href ? "bg-red-600 border-red-500 text-white" : "bg-white/5 border-transparent text-slate-400 hover:text-white"}`}>
              <div className={pathname === item.href ? "text-white" : "text-red-600"}>{item.icon}</div>
              <span className="text-sm font-[1000] uppercase italic tracking-tighter">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}