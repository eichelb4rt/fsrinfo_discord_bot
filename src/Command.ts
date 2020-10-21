import { Message } from "discord.js"

export default abstract class Command {
    readonly enabled: boolean = true;
    abstract readonly description: String;
    abstract readonly invokeStr: String;
    abstract readonly help: String;
    
    condition(msg: Message): boolean {
        const startsWith: string = msg.content.split(" ")[0];
        return startsWith == this.invokeStr;
    }
    
    abstract action(msg: Message): void;
}