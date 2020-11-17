import { CategoryChannel, Channel, Guild, GuildMember, Message, VoiceChannel } from "discord.js"
import { Command } from "../interface/Command";

export default abstract class CreateChannel extends Command {
    categoryName: string;
    invokeStr: string;
    description: string;
    help: string;
    protected readonly interval_time: number = 30;    // interval time for checking if a channel is empty

    constructor(categoryName: string) {
        super();
        this.categoryName = categoryName;
        this.invokeStr = `!${this.categoryName.toLowerCase()}`;
        this.description = `create a temporary voice channel in ${this.categoryName}`;
        this.help = `${this.invokeStr} {<channel name>}`;
    }

    action(msg: Message): void {
        // slice it up into the channels to be created
        const vc_name: string = msg.content.substr(msg.content.indexOf(' ')+1);
        // get the Games Category
        const games_category: Channel | undefined = this.getCategory(msg.guild);
        if (games_category == undefined) {
            msg.channel.send(`There's no category called \"${this.categoryName}\"`);
            return;
        }
        if (vc_name.trim().length != 0) {   // if vc_name isn't only whitespace
            let vc: VoiceChannel;   // voice channel that's gonna be added
            msg.guild?.channels.create(vc_name, {type: "voice", parent: games_category}).then((voice: VoiceChannel) => {
                // success => set the voice channel, confirm
                vc = voice;
                msg.channel.send(`${this.categoryName} Channel ${vc_name} created.`);

                // check every (interval_time) seconds, if the channel is empty
                let interval: NodeJS.Timeout;
                const deleteChannel = () => {
                    if (this.countMembers(vc) == 0) {
                        vc.delete();
                        clearInterval(interval);
                        msg.channel.send(`Temporary ${this.categoryName} channel ${vc_name} deleted because it was empty.`);
                    }
                }
                interval = setInterval(deleteChannel, this.interval_time * 1000);
            }).catch((err) => 
                // error => deny
                msg.channel.send(`Could not create ${vc_name}.`)
            );
        }
        else {
            msg.channel.send(`Usage: ${this.help}`);
        }
    }

    protected countMembers(vc: VoiceChannel): number {
        // count the members in a voice channel
        let member_count = 0;
        for (const member of vc.members) {
            ++member_count;
        }
        return member_count;
    }

    protected getCategory(guild: Guild | null): Channel | undefined {
        // get the Channel Category by the name of "Games"
        return guild?.channels.cache.find((channel: Channel) =>
            channel.type == "category"
            && this.equalsIgnoreCase((channel as CategoryChannel).name, this.categoryName)
        );
    }

    protected equalsIgnoreCase(a: string, b: string): boolean {
        return a.toLowerCase() == b.toLowerCase()
    }
}