import Command from "../Command"
import { Message } from "discord.js"

export default class Ping extends Command {
    invokeStr: string = "!ping";
    description: string = "it's the fucking ping man";
    help: string = "!ping";

    condition(msg: Message): boolean {
        return msg.content === this.invokeStr;
    }

    action(msg: Message): void {
        msg.channel.send("Pong.");
    }
}