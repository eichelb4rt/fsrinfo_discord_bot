import Command from "../CommandTemplate"
import { Message } from "discord.js"

export default class Pong implements Command {
    
    condition(msg: Message): boolean {
        return msg.content === "!pong";
    }

    action(msg: Message): void {
        msg.channel.send("Ping.");
    }
}