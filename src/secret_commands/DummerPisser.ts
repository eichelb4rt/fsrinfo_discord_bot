import SecretCommand from "../SecretCommand"
import { Guild, GuildMember, Message, Role } from "discord.js"

export default class Shutdown extends SecretCommand {

    role_dummer_pisser: Role | undefined = undefined;
    rolestr: string = "Dummer Pisser";
    pisser_time: number = 5 * 60 * 1000;    // 5 minutes of being a Dummer Pisser

    
    condition(msg: Message): boolean {
        const startsWith: string = msg.content.split(" ")[0];
        return startsWith == "!pisser";
    }

    action(msg: Message): void {
        this.setDummerPisserRole(msg.guild);
        if (msg.mentions.members == null || this.role_dummer_pisser == undefined)
            return;

        for (const [key, member] of msg.mentions.members) {
            member.roles.add(this.role_dummer_pisser);
            // remove it after this.pisser_time ms
            setTimeout(() => {
                if (this.role_dummer_pisser != undefined)
                    member.roles.remove(this.role_dummer_pisser);
            }, this.pisser_time);
        }
    }

    private setDummerPisserRole(guild: Guild | null): void {
        // search for a role that has the desired name and is allowed to be added and removed by the user
        if (guild == null)
            return;
        if (this.role_dummer_pisser) {
            return;
        }
        let role: Role | undefined = guild.roles.cache.find(role => role.name == this.rolestr);
        if (role == undefined) {
            guild.roles.create({
                data: {
                    name: "Dummer Pisser",
                    color: 0x9400ff,
                    hoist: false,
                    permissions: [],
                    mentionable: true
                }, 
                reason: "because there needs to be a Dummer Pisser"
            }).then((pisser) => role = pisser);
        }
        this.role_dummer_pisser = role;
    }
}