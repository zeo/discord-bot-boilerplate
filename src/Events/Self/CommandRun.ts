import BaseEvent from "../BaseEvent";
import Bot from "../../Bot";
import {Message} from "discord.js";

export default class CommandRun extends BaseEvent<"commandRun"> {
  public readonly name = "commandRun";
  
  constructor(bot: Bot) {
    super(bot);
  }
  
  async run(msg: Message, cmd: string) {
    this.bot.logger.debug(`${cmd} command executed by ${msg.author.tag}`);
  }
}