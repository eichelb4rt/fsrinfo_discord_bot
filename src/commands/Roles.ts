import Command from "../Command"
import { Message } from "discord.js"

export default class Roles implements Command {
    enabled: boolean = true;
    
    condition(msg: Message): boolean {
        return msg.content === "!role";
    }

    action(msg: Message): void {
        msg.channel.send("not implemented yet.");
    }
}