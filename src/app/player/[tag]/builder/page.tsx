"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";

// TypeScript için params tipini tanımlıyoruz
interface BuilderProps {
  params: Promise<{ tag: string }>;
}

export default function BuilderPage({ params }: BuilderProps) {
  // Params'ı güvenli bir şekilde açıyoruz
  const { tag } = use(params);
  
  const [allCards, setAllCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [deck, setDeck] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Kartları API'den çekme fonksiyonu
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch('/api/cards'); // Kendi API rotana göre düzenle
        const data = await res.json();
        setAllCards(data.items || []);
        setFilteredCards(data.items || []);
        setLoading(false);
      } catch (error) {
        console.error("Kartlar yüklenirken hata oluştu:", error);
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // Deste kopyalama (O meşhur AKTAR butonu fonksiyonu)
  const handleExport = () => {
    if (deck.length !== 8) {
      alert("Lütfen 8 kart seçin!");
      return;
    }
    const cardIds = deck.map(card => card.id).join(';');
    window.location.href = `clashroyale://copyDeck?deck=${cardIds}`;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Deste Oluşturucu - #{tag}</h1>
      
      {/* Seçili Deste Alanı */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap gap-2 min-h-[120px]">
        {deck.map((card, index) => (
          <div key={index} className="relative w-16 h-20 bg-gray-700 rounded cursor-pointer" onClick={() => setDeck(deck.filter(c => c.id !== card.id))}>
             <img src={card.iconUrls.medium} alt={card.name} className="w-full h-full object-contain" />
          </div>
        ))}
        {deck.length === 8 && (
          <button 
            onClick={handleExport}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-all"
          >
            OYUNA AKTAR
          </button>
        )}
      </div>

      <hr className="border-gray-700 mb-6" />

      {/* Kart Listesi */}
      {loading ? (
        <p>Kartlar yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {filteredCards.map((card) => (
            <div 
              key={card.id} 
              className={`cursor-pointer transition-transform hover:scale-105 ${deck.find(c => c.id === card.id) ? 'opacity-50 grayscale' : ''}`}
              onClick={() => {
                if (deck.length < 8 && !deck.find(c => c.id === card.id)) {
                  setDeck([...deck, card]);
                }
              }}
            >
              <img src={card.iconUrls.medium} alt={card.name} title={card.name} className="w-full h-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}