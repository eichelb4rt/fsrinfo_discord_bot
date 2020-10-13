import Command from "../CommandTemplate"
import { Message } from "discord.js"

export default class LogMessage implements Command {
    
    condition(msg: Message): boolean {
        return true;
    }

    action(msg: Message): void {
        console.log(msg)
    }
}