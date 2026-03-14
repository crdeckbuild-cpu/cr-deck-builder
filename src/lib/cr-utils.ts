import { GAME_RULES } from "./game-configs";

export const fixCardData = (card: any) => {
  const displayLevel = GAME_RULES.MAX_LEVEL - (card.maxLevel - card.level);
  const rarity = card.rarity?.toLowerCase() || "common";
  const elixir = card.elixir || card.elixirCost || 0;

  let required = card.requiredForUpgrade || 0;
  if (displayLevel === 15) required = GAME_RULES.UPGRADE_COSTS.CRYSTAL_LEVEL_16;
  else if (displayLevel === 14) required = GAME_RULES.UPGRADE_COSTS.EWC_LEVEL_15;

  return {
    ...card,
    displayLevel,
    rarity,
    isMax: displayLevel === GAME_RULES.MAX_LEVEL,
    isElite: displayLevel === 15,
    isEvolution: card.name?.toLowerCase().includes("evolution") || card.iconUrls?.medium?.includes("evo"),
    requiredForUpgrade: required,
    count: card.count || 0,
    elixir: Number(elixir)
  };
};

export const calculateAvgElixir = (cards: any[]) => {
  if (!cards || cards.length === 0) return "0.0";
  const total = cards.reduce((sum, card) => sum + (Number(card?.elixir) || 0), 0);
  return (total / cards.length).toFixed(1);
};

export const calculateCycle = (cards: any[]) => {
  if (!cards || cards.length < 4) return "0";
  const sortedElixirs = [...cards]
    .filter(c => c.name !== "Mirror")
    .map(c => Number(c?.elixir) || 0)
    .sort((a, b) => a - b);
  
  const cycle = sortedElixirs.slice(0, 4).reduce((sum, e) => sum + e, 0);
  return cycle.toString();
};