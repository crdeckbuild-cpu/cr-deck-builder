import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// SEO AYARLARI (METADATA)
export const metadata: Metadata = {
  title: "CR DECK | AI Destekli Clash Royale Strateji Platformu",
  description: "Clash Royale arenasında en iyi desteleri AI ile kurun, sosyal medya trendlerini takip edin ve meta analizleri ile kupaları toplayın.",
  keywords: "clash royale, deste kurucu, deck builder, meta decks, clash royale haberleri, ai deck strategy",
  openGraph: {
    title: "CR DECK | Profesyonel Strateji Üssü",
    description: "Yapay zeka ile arenayı fethet.",
    url: "https://crdeckbuild.com",
    siteName: "CR Deck Build",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-[#020617] antialiased selection:bg-red-600 selection:text-white`}>
        {/* Layout içinde Sidebar'ı buraya koyarsan her sayfada otomatik görünür. 
            Ancak Sidebar'ı sayfa bazlı kontrol etmek istersen page.tsx içinde bırakabilirsin.
            Genel yaklaşım için children'ı bir container içine alıyoruz. */}
        {children}
      </body>
    </html>
  );
}