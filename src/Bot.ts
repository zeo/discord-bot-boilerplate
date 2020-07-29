import {Client, ClientEvents, ClientOptions, Collection} from "discord.js";
import * as glob from "fast-glob";
import {join as path} from "path";
import Logger from "./Utils/Logger";
import {Command, Event} from "./Utils/Types";
import BaseEvent from "./Events/BaseEvent";
import BaseCommand from "./Commands/BaseCommand";

export default class Bot extends Client {
  public logger: Logger.Logger;
  public commands: Collection<string, Command>;
  
  constructor(options?: ClientOptions) {
    super(options);
    
    this.logger = Logger.getLogger('[BOT]');
    this.commands = new Collection();
  }
  
  async loadEvents(): Promise<void> {
    let files = await glob(['./Events/**/*.js'], {cwd: path(process.cwd(), 'out')});
    let count = 0;
    
    for (let file of files) {
      let event: Event<null> = require(file).default;
      if (!event) {
        this.logger.error(`${file} event file does not have a default export!`);
        continue;
      }
      if (event.name === BaseEvent.name) continue;
      
      let eventInstance = new event(this);
      this.on(eventInstance.name, (...args: []) => eventInstance.run(...args));
      
      count++;
    }
    
    this.logger.trace(`Loaded ${count} events`)
  }
  
  async loadCommands(): Promise<void> {
    let files = await glob(['./Commands/**/*.js'], {cwd: path(process.cwd(), 'out')});
    
    for (let file of files) {
      let command: Command = require(file).default;
      if (!command) {
        this.logger.error(`${file} event file does not have a default export!`);
      }
      if (command.name === BaseCommand.name) continue;
      
      let commandInstance = new command(this);
      this.commands.set(commandInstance.name, commandInstance);
    }
    
    this.logger.trace(`Loaded ${this.commands.size} commands`);
  }
  
  async initialize(): Promise<void> {
    await Promise.all([
      this.loadEvents(),
      this.loadCommands(),
      this.login(process.env.BOT_TOKEN)
    ]);
  }
}