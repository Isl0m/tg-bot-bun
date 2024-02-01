import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { cards } from "./card";

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  coins: integer("coins").default(0),
  cards: integer("cards").default(0),
  tries: integer("tries").default(3),
  lastTimeGetCard: timestamp("lastTimeGetCard", {
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof selectUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;

export const usersToCards = pgTable(
  "users_to_cards",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.cardId] }),
  })
);

export const insertUsersToCardsSchema = createInsertSchema(usersToCards);
export const selectUsersToCardsSchema = createSelectSchema(usersToCards);

export type UsersToCards = z.infer<typeof selectUsersToCardsSchema>;
export type NewUsersToCards = z.infer<typeof insertUsersToCardsSchema>;
