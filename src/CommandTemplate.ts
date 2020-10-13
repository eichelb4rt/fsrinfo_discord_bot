import { Message } from "discord.js"

export default interface Command {
    condition(msg: Message): boolean;
    action(msg: Message): void;
}