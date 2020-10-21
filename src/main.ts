import CONFIG from "./config";
import Discord, { Message } from "discord.js";
import Command from "./Command";
import commands from "./load_commands"

const client = new Discord.Client();

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