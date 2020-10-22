import { Message } from "discord.js"

export default abstract class Command {
    readonly enabled: boolean = true;
    abstract readonly description: string;
    abstract readonly invokeStr: string;
    abstract readonly help: string;
    
    condition(msg: Message): boolean {
        const startsWith: string = msg.content.split(" ")[0];
        return startsWith == this.invokeStr;
    }
    
    abstract action(msg: Message): void;
}