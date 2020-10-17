import CONFIG from "./config";
import Discord, { Message } from "discord.js";
import Command from "./Command";
import loadCommands from "./load_commands"

const client = new Discord.Client();
const commands: Command[] = loadCommands();

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", (message: Message) => {
	for (const command of commands) {
		if (command.condition(message)) {
			command.action(message);
		}
	}
});

client.login(CONFIG.botToken);

