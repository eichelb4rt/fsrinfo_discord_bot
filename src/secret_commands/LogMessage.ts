import { Message } from "discord.js"
import SecretCommand from "../interface/SecretCommand";

export default class LogMessage extends SecretCommand {
    
    invokeStr = 'any';

    onMessage(msg: Message): void {
        this.action(msg);
    }

    action(msg: Message): void {
        console.log(msg)
    }
}