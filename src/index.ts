import { handlerLogin } from "./handlerLogin.js";
import { registerCommand, runCommand } from "./registerAndRun.js";
import { CommandRegistry } from "./types.js";

function main() {
    const commands: CommandRegistry = {};
    
    const args = process.argv;
    const commandName = args[2];
    const commandArgs = args.slice(3);

    registerCommand(commands, commandName, handlerLogin);
    runCommand(commands, commandName, ...commandArgs);
}

main();