import CONFIG from "./config";
import Discord, { Message } from "discord.js";
import Commands from "./import_commands"

const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", (message: Message) => {
	Commands.forEach(command => {
		if (command.condition(message)) {
			command.action(message);
		}
	});
});

client.login(CONFIG.botToken);