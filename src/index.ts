import { handlerAgg } from "./handlerAgg.js";
import { handlerGetUsers } from "./handlerGetUsers.js";
import { handlerLogin } from "./handlerLogin.js";
import { handlerRegister } from "./handlerRegister.js";
import { handlerReset } from "./handlerReset.js";
import { registerCommand, runCommand } from "./registerAndRun.js";
import { CommandRegistry } from "./types.js";

async function main() {
    const commands: CommandRegistry = {};
    
    const args = process.argv;
    const commandName = args[2];
    const commandArgs = args.slice(3);

    registerCommand(commands, "login", handlerLogin);
    registerCommand(commands, "register", handlerRegister);
    registerCommand(commands, "reset", handlerReset);
    registerCommand(commands, "users", handlerGetUsers);
    registerCommand(commands, "agg", handlerAgg);
    
    try {
        await runCommand(commands, commandName, ...commandArgs);
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error running command ${commandName}: ${err.message}`);
        } else {
            console.error(`Error running command ${commandName}: ${err}`);
        }
        process.exit(1);
    }
  process.exit(0);
}

main();