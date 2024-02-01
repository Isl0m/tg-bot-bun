import { Composer } from "grammy";
import { createElement, getElements } from "@/action";

export const element = new Composer();

element.command("elements", async (ctx) => {
  const elements = (await getElements()).map(({ name }) => name);
  if (elements.length === 0) {
    return ctx.reply(
      "No elements found!\nCreate element with /createElement name command"
    );
  }
  return ctx.reply("elements: " + elements.join(", "));
});

element.command("createElement", async (ctx) => {
  const elementName = ctx.match;
  if (!elementName) {
    return ctx.reply(
      "Format of creating element is like this: /elementName name"
    );
  }
  const newElement = await createElement(elementName);
  return ctx.reply("Created element: " + newElement.name);
});
