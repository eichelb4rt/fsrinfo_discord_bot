import FS, { fstat } from "fs";
import Path from "path";
import Command from "./Command";

export const commands: Command[] = loadCommands("commands");
export const secret_commands: Command[] = loadCommands("secret_commands");

function loadCommands(dir: string): Command[] {
	// return all the commands
	let commands: Command[] = [];
	for (const commandName of getFiles(`./src/${dir}`)) {
		const commandClass = require(`./${dir}/${commandName}`).default;
		const command = new commandClass() as Command;
		if (command.enabled)
			commands.push(command);
	}
	return commands;
}

function getFiles(path: string): string[] {
	// returns names of files in the directory path
	let files: string[] = [];
	FS.readdirSync(path).forEach(file => {
		files.push(Path.parse(file).name);
	})
	return files;
}