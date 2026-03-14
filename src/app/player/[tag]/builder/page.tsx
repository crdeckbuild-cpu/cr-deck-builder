"use client";

import { use, useState, useEffect } from "react";

interface BuilderProps {
  params: Promise<{ tag: string }>;
}

export default function BuilderPage({ params }: BuilderProps) {
  const { tag } = use(params);
  const [allCards, setAllCards] = useState<any[]>([]);
  const [deck, setDeck] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/cards').then(res => res.json()).then(data => setAllCards(data.items || []));
  }, []);

  const handleExport = () => {
    if (deck.length !== 8) return alert("8 kart seçin!");
    const cardIds = deck.map(c => c.id).join(';');
    window.location.href = `clashroyale://copyDeck?deck=${cardIds}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Deste Oluşturucu: #{tag}</h1>
      <div className="flex gap-2 mb-4 bg-gray-900 p-4 rounded">
        {deck.map(c => <img key={c.id} src={c.iconUrls.medium} className="w-12 h-14" />)}
        {deck.length === 8 && <button onClick={handleExport} className="bg-yellow-500 p-2 rounded text-black font-bold">AKTAR</button>}
      </div>
      <div className="grid grid-cols-6 gap-2">
        {allCards.map(c => (
          <img key={c.id} src={c.iconUrls.medium} className="cursor-pointer" onClick={() => deck.length < 8 && setDeck([...deck, c])} />
        ))}
      </div>
    </div>
  );
}