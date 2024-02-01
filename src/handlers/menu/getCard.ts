import { Composer, InputFile } from "grammy";
import { createUserToCard, getFullCards, getUser, updateUser } from "@/action";
import { formatSecondsAsTime } from "@/utils";
import { getBaseRarityChances, getRandomCard } from "@/randomCard";

export const getCard = new Composer();

getCard.hears("🎴 Получить карту", async (ctx) => {
  const userId = ctx.from?.id.toString();
  if (!userId) {
    return ctx.reply("Error: userId is undefined");
  }
  const user = await getUser(userId);

  /// TODO: IF not use create new user
  /// TODO: Handle duplicated cards

  let tries = user.tries;
  let lastTimeGetCard = user.lastTimeGetCard;
  let difference = new Date().getTime() - lastTimeGetCard.getTime();

  difference -= 1000 * 60 * 60 * 2;

  if (!tries && difference < 0) {
    difference = Math.abs(difference);
    return ctx.reply(
      "Следующая попытка будет доступна через " +
        formatSecondsAsTime(difference / 1000)
    );
  }

  const cards = await getFullCards();
  const rarityChances = await getBaseRarityChances();
  const randomCard = getRandomCard(cards, rarityChances);
  await createUserToCard({ userId: userId, cardId: randomCard.cards.id });

  if (tries && tries > 0) {
    tries--;
  } else {
    lastTimeGetCard = new Date();
  }
  console.log(lastTimeGetCard + " lastTimeGetCard");

  await updateUser(userId, {
    tries,
    lastTimeGetCard,
    cards: (user.cards || 0) + 1,
  });

  ctx.replyWithPhoto(new InputFile(randomCard.cards.image), {
    caption: `🎴 Карта: ${randomCard.cards.name}\nUniverse: ${randomCard.universes?.name}\nRarity: ${randomCard.rarities?.name}`,
  });
});
