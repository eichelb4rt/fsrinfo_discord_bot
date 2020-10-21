import SecretCommand from "../SecretCommand"
import { Message } from "discord.js"

export default class Shutdown extends SecretCommand {
    enabled: boolean = true;
    
    condition(msg: Message): boolean {
        const startsWith: string = msg.content.split(" ")[0];
        return startsWith == "!shutdown";
    }

    action(msg: Message): void {
        msg.channel.send("no.")
    }
}