"use client";

import { use, useState, useEffect } from "react";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export default function PlayerProfilePage({ params }: PageProps) {
  const { tag } = use(params);
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    // Profil verilerini çekme işlemi buraya gelecek
  }, [tag]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-500">Oyuncu Profili: #{tag}</h1>
      <p className="mt-2 text-gray-400">Profil detayları hazırlanıyor...</p>
    </div>
  );
}