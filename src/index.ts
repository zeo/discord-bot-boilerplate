/**
 * @file index.ts
 * @author Mex de Loo <mex@zeodev.cc>
 * @license MIT
 */
import Bot from "./Bot";
import {config as dotenv} from "dotenv";

dotenv();

const bot = new Bot();
bot.initialize();