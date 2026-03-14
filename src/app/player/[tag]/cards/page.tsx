"use client";

import { use, useState, useEffect } from "react";

interface CardsProps {
  params: Promise<{ tag: string }>;
}

export default function CardsPage({ params }: CardsProps) {
  const { tag } = use(params);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/cards').then(res => res.json()).then(data => setCards(data.items || []));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Kart Koleksiyonu: #{tag}</h2>
      <div className="grid grid-cols-8 gap-2">
        {cards.map(c => <img key={c.id} src={c.iconUrls.medium} className="w-full" />)}
      </div>
    </div>
  );
}