import {
  Composer,
  Context,
  HearsContext,
  InputFile,
  InputMediaBuilder,
} from "grammy";
import { Menu, MenuRange } from "@grammyjs/menu";
import {
  getRaritiesCardsCount,
  getRaritiesUserCardsCount,
  getUserCardsByRarity,
} from "@/action";
import { isValue } from "@/utils";

export const myCards = new Composer();

const rarityMenu = new Menu("rarity-menu");

myCards.use(rarityMenu);

const rarityCardsMenu = new Menu("user-card-explorer");

myCards.use(rarityCardsMenu);

myCards.hears("📜 Мои карты", async (ctx) => {
  const userId = ctx.from?.id.toString();
  if (!userId) {
    return ctx.reply("Error: userId is undefined");
  }

  /////// RARITY MENU ///////

  const rarities = (await getRaritiesCardsCount()).sort(
    (a, b) => b.chance - a.chance
  );
  const userRarities = await getRaritiesUserCardsCount(userId);

  rarityMenu.dynamic(() => {
    const range = new MenuRange();
    rarities.forEach(({ id, name, cardsCount }) => {
      range
        .text(
          `${name} ${
            userRarities.find((u) => u.id === id)?.cardsCount || 0
          }/${cardsCount}`,
          (innerCtx) => {
            innerCtx.deleteMessage();
            showCards(ctx, userId, id);
          }
        )
        .row();
    });
    return range;
  });

  ctx.reply("Choose a rarity:", { reply_markup: rarityMenu });
});

async function showCards(
  ctx: HearsContext<Context>,
  userId: string,
  selectedRarityId: string
) {
  let i = 1,
    userCardsCount = 1;
  const userCards = (await getUserCardsByRarity(userId, selectedRarityId))
    .map((card) => card.cards)
    .filter(isValue);

  if (userCards.length === 0) {
    return ctx.reply("No cards found!");
  }

  /////// RARITY CARDS MENU ///////

  rarityCardsMenu
    .text("<", async (ctx) => {
      if (i > 0) {
        i--;
        const current = userCards[i - 1];
        await ctx.editMessageMedia(
          InputMediaBuilder.photo(new InputFile(current.image))
        );
      }
    })
    .text(() => `${i} из ${userCardsCount}`)
    .text(">", async (ctx) => {
      if (i < userCardsCount) {
        i++;
        const current = userCards[i - 1];
        await ctx.editMessageMedia(
          InputMediaBuilder.photo(new InputFile(current.image))
        );
      }
    })
    .row()
    .text("Назад");

  userCardsCount = userCards.length;
  const current = userCards[i - 1];

  ctx.replyWithPhoto(new InputFile(current.image), {
    reply_markup: rarityCardsMenu,
  });
}
