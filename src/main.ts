import Discord, { Message } from "discord.js";
import { CommandLoader } from "./CommandLoader";
import TOKEN from './token';
const client = new Discord.Client();
const commandLoader = new CommandLoader();

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", (message: Message) => {
	commandLoader.getCommandList().forEach(command => command.onMessage(message));
});

client.login(TOKEN.botToken);