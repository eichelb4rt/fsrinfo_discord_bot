import Command from "../Command"
import { Message, MessageEmbed } from "discord.js"
import { commands } from "../load_commands"

export default class Help extends Command {
    invokeStr: string = "!help";
    description: string = "Help! It's a flying spaghetti monster!";
    help: string = "!help";
    
    condition(msg: Message): boolean {
        return msg.content === this.invokeStr;
    }

    action(msg: Message): void {
        const helpEmbed: MessageEmbed = new MessageEmbed();
        helpEmbed.setTitle("Commands");
        helpEmbed.setColor("#002154");
        for (const command of commands) {
            helpEmbed.addField(command.invokeStr, `\`${command.help}\`\n${command.description}`, false);
        }
        msg.channel.send(helpEmbed);
    }
}