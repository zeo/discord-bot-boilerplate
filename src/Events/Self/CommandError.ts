import BaseEvent from "../BaseEvent";
import Bot from "../../Bot";
import {Message} from "discord.js";

export default class CommandError extends BaseEvent<"commandError"> {
  public readonly name = "commandError";
  
  constructor(bot: Bot) {
    super(bot);
  }
  
  async run(msg: Message, cmd: string, error: Error): Promise<void> {
    this.bot.logger.error(`Execution of ${cmd} command by ${msg.author.tag} failed: ${error.message}`);
  }
}