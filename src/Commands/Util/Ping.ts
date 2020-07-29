/**
 * @file Ping.ts
 * @author Mex de Loo <mex@zeodev.cc>
 * @license MIT
 */
import BaseCommand from "../BaseCommand";
import Bot from "../../Bot";

export default class Ping extends BaseCommand {
  public readonly name = "ping";
  public readonly description = "Pong!";
  public readonly category = "util";
  
  constructor(bot: Bot) {
    super(bot);
  }
  
  async run(msg, args): Promise<void> {
    let pMessage = await msg.channel.send("⏳ Awaiting ping...");
    let ping = Math.floor(pMessage.createdTimestamp - msg.createdTimestamp);
    
    await pMessage.edit(`⏱ My ping is ${ping}ms and my API latency is ${this.bot.ws.ping}ms.`);
  }
}