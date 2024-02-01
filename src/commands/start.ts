import { Composer, Keyboard } from "grammy";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { getUser } from "@/action";

export const start = new Composer();

const keyboard = new Keyboard()
  .text("👤 Профиль")
  .text("🎴 Получить карту")
  .row()
  .text("📜 Мои карты")
  .placeholder("Меню")
  .resized();

start.command("start", async (ctx) => {
  const userId = ctx.from?.id.toString();
  const name = ctx.from?.first_name || "Anonymous";
  if (userId) {
    const user = await getUser(userId);

    if (user) {
      return ctx.reply("Welcome back!", {
        reply_markup: keyboard,
      });
    }

    const newUser = await db.insert(users).values({
      id: userId,
      name,
      lastTimeGetCard: new Date(),
    });

    return ctx.reply("Welcome! " + name, {
      reply_markup: keyboard,
    });
  } else {
    return ctx.reply("Error: userId is undefined");
  }
});
