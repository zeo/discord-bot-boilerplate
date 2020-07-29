import Bot from "../Bot";
import {ClientEvents, Message} from "discord.js";

export interface Event<E extends keyof ClientEvents> {
  name: E;
  disabled?: boolean;
  
  new(bot: Bot): Event<E>;
  run(...args: ClientEvents[E]): Promise<void>;
}

export interface Command {
  name: string;
  description: string;
  category: string;
  
  new(bot: Bot): Command;
  canExecute(msg: Message): boolean;
  run(msg: Message, args: string[]): Promise<void>;
}

declare module "discord.js" {
  interface ClientEvents {
    commandRun: [Message, string];
    commandError: [Message, string, Error];
  }
}