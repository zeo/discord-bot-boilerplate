import {ClientEvents} from "discord.js";
import Bot from "../Bot";

export default abstract class BaseEvent<E extends keyof ClientEvents = null> {
  public abstract name: E;
  public disabled: boolean;
  
  protected bot: Bot;
  
  protected constructor(bot: Bot) {
    this.bot = bot;
  }
  
  async run(...args: ClientEvents[E]): Promise<void> {
  
  }
}
