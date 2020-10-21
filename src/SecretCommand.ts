import { Message } from "discord.js"

export default abstract class SecretCommand {
    readonly enabled: boolean = true;
    readonly description: String = "(missing description)";
    
    abstract condition(msg: Message): boolean;
    abstract action(msg: Message): void;
}