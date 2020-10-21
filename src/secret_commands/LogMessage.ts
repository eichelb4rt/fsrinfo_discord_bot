import SecretCommand from "../SecretCommand"
import { Message } from "discord.js"

export default class LogMessage extends SecretCommand {
    
    condition(msg: Message): boolean {
        return true;
    }

    action(msg: Message): void {
        console.log(msg)
    }
}