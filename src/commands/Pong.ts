import Command from "../Command"
import { Message } from "discord.js"

export default class Pong implements Command {
    enabled: boolean = true;
    
    condition(msg: Message): boolean {
        return msg.content === "!pong";
    }

    action(msg: Message): void {
        msg.channel.send("Ping.");
    }
}