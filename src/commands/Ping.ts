import Command from "../Command"
import { Message } from "discord.js"

export default class Ping extends Command {
    invokeStr: String = "!ping";
    description: String = "it's the fucking ping man";
    help: String = "!ping";

    condition(msg: Message): boolean {
        return msg.content === this.invokeStr;
    }

    action(msg: Message): void {
        msg.channel.send("Pong.");
    }
}