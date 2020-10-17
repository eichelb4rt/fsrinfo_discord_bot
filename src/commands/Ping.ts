import Command from "../Command"
import { Message } from "discord.js"

export default class Ping implements Command {
    enabled: boolean = true;
    
    condition(msg: Message): boolean {
        return msg.content === "!ping";
    }

    action(msg: Message): void {
        msg.channel.send("Pong.");
    }
}