"use client";
import { LayoutGrid, BarChart3, ChevronDown } from "lucide-react";

interface BuilderControlsProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
}

export default function BuilderControls({ onFilterChange, onSortChange }: BuilderControlsProps) {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex gap-2">
        {/* FİLTRELEME SEÇENEĞİ */}
        <div className="relative flex-1 group">
          <select 
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full bg-slate-900 border border-white/5 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none cursor-pointer outline-none hover:border-red-500/40 transition-all focus:ring-2 focus:ring-red-500/20"
          >
            <option value="all">Tüm Kartlar</option>
            <option value="crystal">Level 16 (Kristal)</option>
            <option value="champion">Şampiyonlar</option>
            <option value="legendary">Efsanevi</option>
            <option value="epic">Destansı</option>
            <option value="rare">Ender</option>
            <option value="common">Sıradan</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
            <ChevronDown size={14} />
          </div>
        </div>

        {/* SIRALAMA SEÇENEĞİ */}
        <div className="relative flex-1 group">
          <select 
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full bg-slate-900 border border-white/5 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest appearance-none cursor-pointer outline-none hover:border-red-500/40 transition-all focus:ring-2 focus:ring-red-500/20"
          >
            <option value="elixir-desc">İksir (Azalan)</option>
            <option value="elixir-asc">İksir (Artan)</option>
            <option value="level-desc">Seviye (En Yüksek)</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}