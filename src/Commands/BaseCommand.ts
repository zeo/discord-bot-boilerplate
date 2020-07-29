import Bot from "../Bot";
import {Message} from "discord.js";

export default abstract class BaseCommand {
  public abstract name: string;
  public abstract description: string;
  public abstract category: string;
  
  protected bot: Bot;
  
  protected constructor(bot: Bot) {
    this.bot = bot;
  }
  
  /**
   * Returns if the user can run the command
   *
   * @param {Message} msg
   * @returns {boolean} canExecute
   */
  canExecute(msg: Message): boolean {
    return true;
  }
  
  /**
   * Runs the command
   *
   * @param msg
   * @param args
   */
  async run(msg: Message, args: string[]): Promise<void> {
    this.bot.logger.warn(`${this.name} command does not have a run function!`);
    return;
  }
}