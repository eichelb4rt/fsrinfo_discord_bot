import FS, { fstat } from "fs";
import Path from "path";
import Command from "./Command";

const commands: Command[] = loadCommands();
export default commands;

function loadCommands(): Command[] {
	// return all the commands
	let commands: Command[] = [];
	for (const commandName of getFiles("./src/commands")) {
		const commandClass = require(`./commands/${commandName}`).default;
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