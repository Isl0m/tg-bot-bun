import { Config } from "./config";
import { db } from "./db";
import { cards, elements } from "./db/schema/card";
import { uuid } from "./utils";

const ELEMENT = {
  water: "72adf15c-fec6-49a9-b066-17dea17c3f4e",
  fire: "60369cb7-6de4-4299-8945-5a2a522ad7d0",
  thunder: "0b475f8f-7bfc-4311-891e-19d9a8b7b0d6",
};

const RARITY = {
  rare: "543e389f-5f6f-4a6b-9b27-d11c277df717",
  epic: "fd23825f-1106-49e5-b4a8-1f3dddad0656",
  legendary: "db461439-505f-47fa-bddf-9639aad04ce2",
};

const UNIVERSE = {
  onepiece: "7d753fea-6603-4c07-a5c4-14a23389bf68",
};

async function run() {
  const newCard = await db
    .insert(cards)
    .values([
      // LEGENDARY
      {
        id: uuid(),
        name: "Монки Д. Луффи",
        power: 97,
        image: Config.cardImagesPath + "luffy.png",
        elementId: ELEMENT.thunder,
        rarityId: RARITY.legendary,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Багги",
        power: 95,
        image: Config.cardImagesPath + "buggy.png",
        elementId: ELEMENT.thunder,
        rarityId: RARITY.legendary,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Маршалл Д. Тич",
        power: 97,
        image: Config.cardImagesPath + "teach.png",
        elementId: ELEMENT.fire,
        rarityId: RARITY.legendary,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Шанкс",
        power: 99,
        image: Config.cardImagesPath + "teach.png",
        elementId: ELEMENT.water,
        rarityId: RARITY.legendary,
        universeId: UNIVERSE.onepiece,
      },

      /// EPIC

      {
        id: uuid(),
        name: "Ророноа Зоро",
        power: 88,
        image: Config.cardImagesPath + "zoro.png",
        elementId: ELEMENT.water,
        rarityId: RARITY.epic,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Трафальгар Ло",
        power: 90,
        image: Config.cardImagesPath + "law.png",
        elementId: ELEMENT.thunder,
        rarityId: RARITY.epic,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Юстасс Кид",
        power: 89,
        image: Config.cardImagesPath + "kid.png",
        elementId: ELEMENT.thunder,
        rarityId: RARITY.epic,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Портгас Д. Эйс",
        power: 87,
        image: Config.cardImagesPath + "ace.png",
        elementId: ELEMENT.fire,
        rarityId: RARITY.epic,
        universeId: UNIVERSE.onepiece,
      },

      /// RARE

      {
        id: uuid(),
        name: "Дзимбэй",
        power: 80,
        image: Config.cardImagesPath + "jinbei.png",
        elementId: ELEMENT.water,
        rarityId: RARITY.rare,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Брук",
        power: 79,
        image: Config.cardImagesPath + "brook.png",
        elementId: ELEMENT.thunder,
        rarityId: RARITY.rare,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Санджи",
        power: 80,
        image: Config.cardImagesPath + "sanji.png",
        elementId: ELEMENT.fire,
        rarityId: RARITY.rare,
        universeId: UNIVERSE.onepiece,
      },
      {
        id: uuid(),
        name: "Усопп",
        power: 76,
        image: Config.cardImagesPath + "usopp.png",
        elementId: ELEMENT.thunder,
        rarityId: RARITY.rare,
        universeId: UNIVERSE.onepiece,
      },
    ])
    .returning();
  console.log(newCard);
}

run();
