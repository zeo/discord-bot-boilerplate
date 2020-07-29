import BaseEvent from "../BaseEvent";
import Bot from "../../Bot";

export default class Ready extends BaseEvent<"ready"> {
  public readonly name = "ready";
  
  constructor(bot: Bot) {
    super(bot);
  }
  
  async run(): Promise<void> {
    this.bot.logger.info(`Logged in as ${this.bot.user.tag}!`);
  }
}