import {ColorResolvable, MessageEmbed} from "discord.js";

class Responses {
  private default(title: string, description: string, color: ColorResolvable, authorImg?: string): MessageEmbed {
    return new MessageEmbed()
      .setAuthor(title, authorImg)
      .setDescription(description)
      .setColor(color)
      .setFooter(process.env.FOOTER_NAME, process.env.FOOTER_URL)
      .setTimestamp();
  }
  
  success(title: string, description: string) {
    return this.default(title, description, '#2ecc71', 'https://cdn.discordapp.com/emojis/737995054332903497.png?v=1');
  }
  
  error(title: string, description: string) {
    return this.default(title, description, '#e74c3c', 'https://cdn.discordapp.com/emojis/737995054702133299.png?v=1');
  }
  
  info(title: string, description: string) {
    return this.default(title, description, '#3498db', 'https://cdn.discordapp.com/emojis/737997323157766144.png?v=1');
  }
}

export default new Responses();