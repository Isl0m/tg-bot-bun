import { NewUsersToCards, User, users, usersToCards } from "./db/schema/user";
import { db } from "./db";
import { and, desc, eq, sql } from "drizzle-orm";
import { cards, elements, rarities, universes } from "./db/schema/card";
import { uuid } from "./utils";

export async function getRarities() {
  return db.select().from(rarities);
}

export async function getRaritiesCardsCount() {
  return db
    .select({
      id: rarities.id,
      name: rarities.name,
      chance: rarities.chance,
      cardsCount: sql<number>`cast(count(${cards.rarityId}) as int)`,
    })
    .from(rarities)
    .leftJoin(cards, eq(rarities.id, cards.rarityId))
    .groupBy(rarities.id);
}

export async function getRaritiesUserCardsCount(id: string) {
  const userCards = db
    .select()
    .from(usersToCards)
    .where(eq(usersToCards.userId, id))
    .leftJoin(cards, eq(usersToCards.cardId, cards.id))
    .as("userCards");

  return db
    .select({
      id: rarities.id,
      name: rarities.name,
      cardsCount: sql<number>`cast(count(${userCards.cards.rarityId}) as int)`,
    })
    .from(rarities)
    .leftJoin(userCards, eq(rarities.id, userCards.cards.rarityId))
    .groupBy(rarities.id);
}

export async function createRarity(name: string, chance: number) {
  const [newRarity] = await db
    .insert(rarities)
    .values({ id: uuid(), name, chance })
    .returning();
  return newRarity;
}

export async function getElements() {
  return db.select().from(elements);
}

export async function createElement(name: string) {
  const [newElement] = await db
    .insert(elements)
    .values({ id: uuid(), name, beats: ["id"] })
    .returning();
  return newElement;
}

export async function getUniverses() {
  return db.select().from(universes);
}

export async function createUniverse(name: string) {
  const [newUniverse] = await db
    .insert(universes)
    .values({ id: uuid(), name })
    .returning();
  return newUniverse;
}

export async function getCards() {
  return db.select().from(cards).orderBy(desc(cards.power));
}

export async function getFullCards() {
  return db
    .select()
    .from(cards)
    .orderBy(desc(cards.power))
    .leftJoin(rarities, eq(cards.rarityId, rarities.id))
    .leftJoin(elements, eq(cards.elementId, elements.id))
    .leftJoin(universes, eq(cards.universeId, universes.id));
}

export async function getUser(id: string) {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0] ?? null);
}

export async function createUserToCard(data: NewUsersToCards) {
  return db.insert(usersToCards).values(data).returning();
}

export async function updateUser(
  id: string,
  data: Omit<Partial<User>, "id" | "createdAt">
) {
  const updateUser = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return updateUser;
}

export async function getUserCardsCount(id: string) {
  const count = await db
    .select()
    .from(usersToCards)
    .where(eq(usersToCards.userId, id))
    .then((res) => res.length);
  return count;
}

export async function getUserCards(id: string) {
  return db
    .select()
    .from(usersToCards)
    .where(eq(usersToCards.userId, id))
    .leftJoin(cards, eq(usersToCards.cardId, cards.id));
}

export async function getUserCardsByRarity(id: string, rarityId: string) {
  return db
    .select()
    .from(usersToCards)
    .where(eq(usersToCards.userId, id))
    .leftJoin(
      cards,
      and(eq(usersToCards.cardId, cards.id), eq(cards.rarityId, rarityId))
    );
}
