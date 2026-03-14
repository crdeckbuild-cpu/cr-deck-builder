"use client";

export default function AIButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[100] group"
    >
      {/* Parlama Efekti */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-slate-900 px-6 py-4 rounded-2xl flex items-center gap-3 border border-white/10 leading-none">
        <span className="text-2xl animate-pulse">✨</span>
        <div className="space-y-1">
          <p className="text-white font-black italic tracking-widest text-[10px] uppercase">AI SİHİRBAZI</p>
          <p className="text-slate-400 font-bold text-[8px] uppercase tracking-tighter">Otomatik Deste Üret</p>
        </div>
      </div>
    </button>
  );
}