import { Composer } from "grammy";
import { start } from "./start";
import { rarity } from "./admin/rarity";
import { element } from "./admin/element";
import { universe } from "./admin/universe";

const composer = new Composer();

composer.use(start, rarity, element, universe);

export default composer;
