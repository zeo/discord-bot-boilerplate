import Bot from "./Bot";
import {config as dotenv} from "dotenv";

dotenv();

const bot = new Bot();
bot.initialize();