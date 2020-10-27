import { Message, User, Role, Guild, DiscordAPIError } from "discord.js"
import { Command } from "../interface/Command";

export default class Roles extends Command {
    invokeStr: string = "!role";
    description: string = "add or remove some roles";
    help: string = "!role {add|remove} <role name>";

    // roles that can be added and removed by the user
    private RoleHashMaps: Map<Guild, Map<string, Role>> = new Map();
    private readonly allowedRoles: Set<string> = new Set(["Games", "Student", "Jobs"]);

    action(msg: Message): void {
        let type: string = msg.content.split(" ")[1];
        let args: string[] = msg.content.split(" ").slice(2);
        for (const rolestr of args) {
            const role: Role | undefined = this.strToRole(msg.guild, rolestr);
            // catch undefined role
            if (role == undefined) {
                msg.channel.send(`Role ${rolestr} not found.`);
                return;
            }
            // role is not undefined
            if (this.allowedRoles.has(rolestr)) {
                switch (type) {
                    case "add": this.add(msg, msg.guild, msg.author, role); break;
                    case "remove": this.remove(msg, msg.guild, msg.author, role); break;
                }
            } else {
                msg.channel.send("nice try");
            }
        }
    }

    private strToRole(guild: Guild | null, rolestr: string): Role | undefined {
        // search for a role that has the desired name and is allowed to be added and removed by the user
        if (guild == null)
            return undefined;
        if (this.RoleHashMaps.has(guild)) {
            const guildedAllowedRoles: Map<string, Role> | undefined = this.RoleHashMaps.get(guild);
            // this technically can't happen but it won't compile without it
            if (guildedAllowedRoles == undefined) {
                return undefined;
            }
            // guild is already in HashMap
            if (guildedAllowedRoles.has(rolestr)) {
                // role is in HashMap
                return guildedAllowedRoles.get(rolestr);
            } else {
                // role is not in HashMap
                const role: Role | undefined = guild.roles.cache.find(role => role.name == rolestr);
                if (role != undefined) {
                    guildedAllowedRoles.set(rolestr, role);
                }
                return role;
            }
        }
        //guild is not in HashMap
        this.RoleHashMaps.set(guild, new Map<string, Role>())
        return this.strToRole(guild, rolestr)
    }

    private add(msg: Message, guild: Guild | null, user: User, role: Role): void {
        try {
            guild?.member(user)?.roles.add(role);
            msg.channel.send(`Role \"${role.name}\" added.`)
        } catch { (e: DiscordAPIError) =>
            msg.channel.send("Insufficient permissions.")
        }
    }

    private remove(msg: Message, guild: Guild | null, user: User, role: Role): void {
        try {
            guild?.member(user)?.roles.remove(role);
            msg.channel.send(`Role \"${role.name}\" removed.`)
        } catch { (e: DiscordAPIError) =>
            msg.channel.send("Insufficient permissions.")
        }
    }
}