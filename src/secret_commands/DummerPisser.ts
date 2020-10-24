import { Guild, GuildMember, Message, Role, RoleData } from "discord.js"
import SecretCommand from "../interface/SecretCommand";

export default class DummerPisser extends SecretCommand {
    
    invokeStr = '!pisser';
    private pisser_map: Map<Guild, Role> = new Map();
    private readonly rolestr: string = "Dummer Pisser";
    private readonly pisser_time: number = 5 * 60 * 1000;    // 5 minutes of being a Dummer Pisser
    private readonly pisser_template: { data?: RoleData | undefined; reason?: string | undefined; } = {
        data: {
            name: this.rolestr,
            color: 0x9400ff,
            hoist: false,
            permissions: [],
            mentionable: true
        }, 
        reason: "because there needs to be a Dummer Pisser"
    }

    async action(msg: Message): Promise<void> {
        const role_dummer_pisser: Role | undefined = await this.getDummerPisserRole(msg.guild);
        if (msg.mentions.members == null || role_dummer_pisser == undefined)
            return;
        let message_an_dumme_pisser: string = "";
        for (const [key, member] of msg.mentions.members) {
            member.roles.add(role_dummer_pisser);
            // remove it after this.pisser_time ms
            setTimeout(() => {
                if (role_dummer_pisser != undefined)
                    member.roles.remove(role_dummer_pisser);
            }, this.pisser_time);
            message_an_dumme_pisser += `Halt dein Maul, ${member.displayName}.\n`;
        }
        msg.channel.send(message_an_dumme_pisser);
    }

    private async getDummerPisserRole(guild: Guild | null): Promise<Role | undefined> {
        // search for a role that has the desired name and is allowed to be added and removed by the user
        if (guild == null)
            return undefined;
        // already found once
        if (this.pisser_map.has(guild))
            return this.pisser_map.get(guild);
        // doesn't exist
        let role: Role | undefined = guild.roles.cache.find(role => role.name == this.rolestr);
        // found pisser role in guild
        if (role != undefined) {
            this.pisser_map.set(guild, role);
            return role;
        } else {
            await guild.roles.create(this.pisser_template).then((pisser) => {this.pisser_map.set(guild, pisser)});
            return this.pisser_map.get(guild);
        }
    }
}