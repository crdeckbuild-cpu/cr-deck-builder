import PlayerNav from "@/components/layout/PlayerNav";

interface PlayerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ tag: string }>; // Next.js 15 için Promise yapısı zorunludur
}

export default async function PlayerLayout({ children, params }: PlayerLayoutProps) {
  // 1. URL parametrelerini asenkron olarak çözüyoruz (undefined hatasını çözen kısım)
  const resolvedParams = await params;
  const tag = resolvedParams.tag;

  // 2. Güvenlik: Eğer tag bir şekilde gelmezse boş sayfa dönerek kırılmayı engeller
  if (!tag) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* 3. Çözülen tag'i PlayerNav'a gönderiyoruz */}
      <PlayerNav tag={tag} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-1000">
        {children}
      </main>

      <footer className="py-12 border-t border-white/5 mt-20 text-center">
        <div className="opacity-20 flex flex-col items-center gap-2">
          <p className="text-[10px] font-black tracking-[0.5em] uppercase">
            CRDECKBUILD.COM // AI POWERED ANALYTICS
          </p>
          <div className="w-10 h-[1px] bg-yellow-500"></div>
        </div>
      </footer>
    </div>
  );
}