import { Composer } from "grammy";
import { createRarity, getRarities } from "@/action";

export const rarity = new Composer();

rarity.command("rarities", async (ctx) => {
  const rarities = (await getRarities()).map(({ name }) => name);
  if (rarities.length === 0) {
    return ctx.reply(
      "No rarities found!\nCreate rarity with /createRarity name|chance command"
    );
  }
  return ctx.reply("Rarities: " + rarities.join(", "));
});

rarity.command("createRarity", async (ctx) => {
  const value = ctx.match;
  const [name, chanceString] = value.split("|");
  const chance = Number(chanceString);

  if (typeof name !== "string" || chance > 100) {
    return ctx.reply(
      "Format of creating rarity is like this: /rarityName name|chance"
    );
  }
  const newRarity = await createRarity(name, chance);
  return ctx.reply("Created rarity: " + newRarity.name);
});
