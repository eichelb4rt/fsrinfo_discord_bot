import Command from "../Command"
import { Message, User, Role } from "discord.js"

export default class Roles implements Command {
    enabled: boolean = true;
    
    condition(msg: Message): boolean {
        let startsWith: string = msg.content.split(" ")[0];
        return startsWith == "!role"
    }

    action(msg: Message): void {
        // clean that up pls
        let type: string = msg.content.split(" ")[1];
        switch (type) {
            case "add": this.add(msg); break;
            case "remove": this.remove(msg); break;
        }
    }

    add(msg: Message): void {
        // adds the roles in the args
        let args: string[] = msg.content.split(" ").slice(2);
        let user: User = msg.author;
        for (const rolestr of args) {
            let role: Role | undefined = msg.guild?.roles.cache.find(role => role.name == rolestr);
            if (role != undefined)
                msg.guild?.member(user)?.roles.add(role);
        }
    }

    remove(msg: Message): void {
        // removes the roles in the args
        let args: string[] = msg.content.split(" ").slice(2);
        let user: User = msg.author;
        for (const rolestr of args) {
            let role: Role | undefined = msg.guild?.roles.cache.find(role => role.name == rolestr);
            if (role != undefined)
                msg.guild?.member(user)?.roles.remove(role);
        }
    }
}