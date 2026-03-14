export const CARD_ELIXIR_MAP: { [key: string]: number } = {
  "Mirror": 0, "Three Musketeers": 9, "Golem": 8, "P.E.K.K.A": 7, "Royal Recruits": 7,
  "Mega Knight": 7, "Elite Barbarians": 6, "Royal Giant": 6, "Sparky": 6, "Giant Skeleton": 6,
  "Balloon": 5, "Prince": 5, "Bowler": 5, "Executioner": 5, "Wizard": 5, "Witch": 5,
  "Giant": 5, "Ram Rider": 5, "Royal Hogs": 5, "Electro Dragon": 5, "Baby Dragon": 4,
  "Dark Prince": 4, "Hog Rider": 4, "Mini P.E.K.K.A": 4, "Musketeer": 4, "Valkyrie": 4,
  "Battle Ram": 4, "Knight": 3, "Archers": 3, "Miner": 3, "Princess": 3, "Ice Wizard": 3,
  "Bandit": 3, "Royal Ghost": 3, "Dart Goblin": 3, "Mega Minion": 3, "Goblins": 2,
  "Spear Goblins": 2, "Wall Breakers": 2, "Bats": 2, "Skeletons": 1, "Electro Spirit": 1,
  "Ice Spirit": 1, "Fire Spirit": 1, "Heal Spirit": 1, "Lightning": 6, "Rocket": 6,
  "Graveyard": 5, "Freeze": 4, "Poison": 4, "Fireball": 4, "Arrows": 3, "Tornado": 3,
  "The Log": 2, "Zap": 2, "Giant Snowball": 2, "Barbarian Barrel": 2, "Rage": 2,
  "Barbarian Hut": 7, "Elixir Collector": 6, "X-Bow": 6, "Inferno Tower": 5, "Bomb Tower": 4,
  "Tesla": 4, "Goblin Cage": 4, "Furnace": 4, "Mortar": 4, "Cannon": 3, "Tombstone": 3,
};

export const getCorrectElixir = (cardName: string): number => {
  return CARD_ELIXIR_MAP[cardName] ?? 3; 
};