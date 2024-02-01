import { Composer } from "grammy";
import { profile } from "./menu/profile";
import { getCard } from "./menu/getCard";
import { myCards } from "./menu/myCards";

const composer = new Composer();

composer.use(profile, getCard, myCards);

export default composer;
