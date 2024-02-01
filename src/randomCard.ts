import { z } from "zod";
import { Card, FullCard } from "./db/schema/card";
import { isKey } from "./utils";
import { getRarities } from "./action";

export type RarityChances = Record<string, number>;

function getRandomRarity(rarityChances: RarityChances) {
  const weightedProbabilities = [];
  const chances = rarityChances;

  for (const item in chances) {
    if (isKey(chances, item)) {
      const chance = chances[item];
      if (!chance) {
        continue;
      }
      for (let i = 0; i < chance * 100; i++) {
        weightedProbabilities.push(item);
      }
    }
  }

  const randomIndex = Math.floor(Math.random() * weightedProbabilities.length);
  return weightedProbabilities[randomIndex];
}

export function getRandomCard(cards: FullCard[], rarityChances: RarityChances) {
  const rarity = getRandomRarity(rarityChances);
  const cardsByRarity = cards.filter((card) => card.cards.rarityId === rarity);
  const randomIndex = Math.floor(Math.random() * cardsByRarity.length);
  return cardsByRarity[randomIndex];
}

export async function getBaseRarityChances(): Promise<RarityChances> {
  const rarities = await getRarities();
  const rarityChances: Map<string, number> = new Map();
  rarities.forEach(({ id, chance }) => rarityChances.set(id, chance));

  return Object.fromEntries(rarityChances);
}

// const results: Record<string, number> = {};
// const resultsRarity: Record<string, number> = {};

// const rarityChances = await getBaseRarityChances();
// for (let i = 0; i < 1000; i++) {
//   const card = getRandomCard(await getCards(), rarityChances);
//   results[card.name] = (results[card.name] || 0) + 1;
//   resultsRarity[card.rarityId] = (resultsRarity[card.rarityId] || 0) + 1;
// }

// console.log(results);
// console.log(resultsRarity);
