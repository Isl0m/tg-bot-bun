import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const cards = pgTable("cards", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  power: integer("power").notNull(),
  image: text("image").notNull(),
  fullImage: text("full_image"),

  universeId: text("universeId")
    .notNull()
    .references(() => universes.id, { onDelete: "cascade" }),
  elementId: text("elementId")
    .notNull()
    .references(() => elements.id, { onDelete: "cascade" }),
  rarityId: text("rarityId")
    .notNull()
    .references(() => rarities.id, { onDelete: "cascade" }),
});

export const universes = pgTable("universes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const elements = pgTable("elements", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  beats: text("beats").array(),
});

export const rarities = pgTable("rarities", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  chance: integer("chance").notNull(),
});

export const insertCardSchema = createInsertSchema(cards);
export const selectCardSchema = createSelectSchema(cards);

export const insertUniverseSchema = createInsertSchema(universes);
export const insertElementSchema = createInsertSchema(elements, {
  beats: z.array(z.string()),
});
export const insertRaritySchema = createInsertSchema(rarities);

export type Card = z.infer<typeof selectCardSchema>;
export type NewUser = z.infer<typeof insertCardSchema>;

export type Universe = z.infer<typeof insertUniverseSchema>;
export type Element = z.infer<typeof insertElementSchema>;
export type Rarity = z.infer<typeof insertRaritySchema>;

export type FullCard = {
  cards: Card;
  universes: Universe | null;
  elements: Element | null;
  rarities: Rarity | null;
};
