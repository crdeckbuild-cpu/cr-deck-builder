"use client";
import { Bot, Terminal, Activity, Sparkles, ChevronRight } from "lucide-react";
import { AI_LOGS } from "@/lib/game-configs";

export default function AIReportPanel() {
  return (
    <div className="relative group max-w-3xl mx-auto mb-12">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
      <div className="relative bg-slate-950/80 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl text-red-500 border border-red-500/20">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="text-white font-black text-sm tracking-widest uppercase">AI GÖZLEMCİ</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase italic">Son Analiz: {AI_LOGS.lastUpdate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-2xl border border-white/5">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-green-500 uppercase">AKTİF</span>
          </div>
        </div>
        <div className="grid gap-3 mb-8">
          {AI_LOGS.changes.map((change, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-transparent hover:border-white/5 group/item transition-all">
              <Terminal size={14} className="text-red-500 opacity-50 group-hover/item:opacity-100" />
              <p className="text-[11px] text-slate-300 font-medium">{change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}