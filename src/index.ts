import { Bot, GrammyError, HttpError } from "grammy";
import Commands from "@/commands";
import Handlers from "@/handlers";
import { Menu, MenuRange } from "@grammyjs/menu";
import { getRaritiesCardsCount } from "./action";

const botToken = Bun.env.TG_BOT_TOKEN;

if (!botToken) {
  throw new Error("TG_BOT_TOKEN is not set");
}

const bot = new Bot(botToken);

bot.use(Commands, Handlers);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();
