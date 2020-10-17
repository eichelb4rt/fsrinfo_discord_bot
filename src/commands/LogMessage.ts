import Command from "../Command"
import { Message } from "discord.js"

export default class LogMessage implements Command {
    enabled: boolean = true;
    
    condition(msg: Message): boolean {
        return true;
    }

    action(msg: Message): void {
        console.log(msg)
    }
}