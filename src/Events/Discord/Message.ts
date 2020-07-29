import BaseEvent from "../BaseEvent";
import Bot from "../../Bot";
import {Message as DiscordMessage} from "discord.js";

export default class Message extends BaseEvent<"message"> {
  public readonly name = "message";
  
  constructor(bot: Bot) {
    super(bot);
  }
  
  async run(msg: DiscordMessage): Promise<void> {
    if (msg.author.bot) return; // Ignore bots
    
    let prefix = process.env.COMMAND_PREFIX;
    if (!msg.content.startsWith(prefix)) return;
    
    let args = msg.content.trim().split(' ');
    let command = args.shift().slice(prefix.length).toLowerCase();
    
    if (!this.bot.commands.has(command)) return;
    
    let cmd = this.bot.commands.get(command);
    if (!cmd.canExecute(msg)) return;
    
    cmd.run(msg, args)
      .then(() => {
        this.bot.emit('commandRun', msg, command);
      })
      .catch(e => {
        this.bot.emit('commandError', msg, command, e);
      });
  }
}