import { CategoryChannel, Channel, Guild, GuildMember, Message, VoiceChannel } from "discord.js"
import { Command } from "../interface/Command";

export default class Games extends Command {
    invokeStr: string = "!game";
    description: string = "create a temporary voice channel in games";
    help: string = "!game {<channel name>}";
    private readonly interval_time: number = 30;    // interval time for checking if a channel is empty

    action(msg: Message): void {
        // slice it up into the channels to be created
        const args: string[] = msg.content.split(" ").slice(1);
        // get the Games Category
        const games_category: Channel | undefined = this.getGames(msg.guild);
        if (games_category == undefined) {
            msg.channel.send("There's no category calles \"Games\"");
            return;
        }
        for (const vc_name of args) {
            let vc: VoiceChannel;   // voice channel that's gonna be added
            msg.guild?.channels.create(vc_name, {type: "voice", parent: games_category}).then((voice: VoiceChannel) => {
                // success => set the voice channel, confirm
                vc = voice;
                msg.channel.send(`Game Channel ${vc_name} created.`);
            }).catch((err) => 
                // error => deny
                msg.channel.send(`Could not create ${vc_name}.`)
            );

            // check every (interval_time) seconds, if the channel is empty
            let interval: NodeJS.Timeout;
            const deleteChannel = () => {
                if (this.countMembers(vc) == 0) {
                    vc.delete();
                    clearInterval(interval);
                    msg.channel.send(`Temporary game channel ${vc_name} deleted because it was empty.`);
                }
            }
            interval = setInterval(deleteChannel, this.interval_time * 1000);
        }
    }

    private countMembers(vc: VoiceChannel): number {
        // count the members in a voice channel
        let member_count = 0;
        for (const member of vc.members) {
            ++member_count;
        }
        return member_count;
    }

    private getGames(guild: Guild | null): Channel | undefined {
        // get the Channel Category by the name of "Games"
        return guild?.channels.cache.find((channel: Channel) =>
            channel.type == "category"
            && (channel as CategoryChannel).name == "Games"
        );
    }
}