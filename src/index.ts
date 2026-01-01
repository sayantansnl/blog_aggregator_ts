import { handlerAddFeed } from "./handlerAddFeed.js";
import { handlerAgg } from "./handlerAgg.js";
import { handlerFeeds } from "./handlerFeeds.js";
import { handlerFollow } from "./handlerFollow.js";
import { handlerFollowing } from "./handlerFollowing.js";
import { handlerGetUsers } from "./handlerGetUsers.js";
import { handlerLogin } from "./handlerLogin.js";
import { handlerRegister } from "./handlerRegister.js";
import { handlerReset } from "./handlerReset.js";
import { middlewareLoggedIn } from "./middleware.js";
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
    registerCommand(commands, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(commands, "feeds", handlerFeeds);
    registerCommand(commands, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(commands, "following", middlewareLoggedIn(handlerFollowing));
    
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