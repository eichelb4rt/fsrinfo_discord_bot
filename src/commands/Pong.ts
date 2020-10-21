import Command from "../Command"
import { Message } from "discord.js"

export default class Pong extends Command {
    invokeStr: String = "!pong";
    description: String = "it's ping but cooler";
    help: String = "!pong";

    condition(msg: Message): boolean {
        return msg.content === this.invokeStr;
    }

    action(msg: Message): void {
        msg.channel.send("PENG");
    }
}