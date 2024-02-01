import { Composer } from "grammy";
import { getUser } from "@/action";

export const profile = new Composer();

profile.hears("👤 Профиль", async (ctx) => {
  if (!ctx.from?.id) {
    return ctx.reply("Error: userId is undefined");
  }
  const user = await getUser(ctx.from.id.toString());
  if (!user) {
    return ctx.reply("Error: user not found");
  }
  return ctx.reply(
    `👤 Профиль : ${user.name}\n\n🔑 Id: ${user.id}\n🎴 Карт : ${user.cards}\n📮 Попытки : ${user.tries}\n🪙 Coins : ${user.coins}`
  );
});
