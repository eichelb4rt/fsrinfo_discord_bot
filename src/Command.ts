import { Message } from "discord.js"

export default interface Command {
    readonly enabled: boolean;
    condition(msg: Message): boolean;
    action(msg: Message): void;
}