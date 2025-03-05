import { metmuseum } from "../images";
import env from "@env";
const TelegramBot = require("node-telegram-bot-api");

const { TG_BOT_TOKEN, TG_CHANNEL_ID } = env;

const bot = new TelegramBot(TG_BOT_TOKEN, { polling: true });

async function sendImage() {
  const image = await metmuseum();
  const imageUrl = image?.image;
  const caption = image?.description;

  if (imageUrl) {
    bot
      .sendPhoto(TG_CHANNEL_ID, imageUrl, { caption, parse_mode: "Markdown" })
      .then(() => {
        console.log("Image sent successfully");
      })
      .catch((err: any) => {
        console.error("Error sending image:", err);
      });
  } else {
    console.log("No image URL found.");
  }
}

const timer = (func: () => void, time: number) => {
  func();
  setTimeout(() => timer(func, time), time);
};

timer(sendImage, 1000 * 60 * 60);
