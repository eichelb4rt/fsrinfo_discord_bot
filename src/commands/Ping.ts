import Command from "../CommandTemplate"
import { Message } from "discord.js"

export default class Ping implements Command {
    
    condition(msg: Message): boolean {
        return msg.content === "!ping";
    }

    action(msg: Message): void {
        msg.channel.send("Pong.");
    }
}