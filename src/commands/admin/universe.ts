import { Composer } from "grammy";
import { createUniverse, getUniverses } from "@/action";

export const universe = new Composer();

universe.command("universes", async (ctx) => {
  const universes = (await getUniverses()).map(({ name }) => name);
  if (universes.length === 0) {
    return ctx.reply(
      "No universes found!\nCreate universe with /createUniverse name command"
    );
  }
  return ctx.reply("universes: " + universes.join(", "));
});

universe.command("createUniverse", async (ctx) => {
  const universeName = ctx.match;
  if (!universeName) {
    return ctx.reply(
      "Format of creating universe is like this: /createUniverse name"
    );
  }
  const newUniverse = await createUniverse(universeName);
  return ctx.reply("Created universe: " + newUniverse.name);
});
