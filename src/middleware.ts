import { readConfig } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";
import { CommandHandler, UserCommandHandler } from "./types.js";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const config = readConfig();
        const userName = config.currentUserName;
        if (!userName) {
            throw new Error("User not logged in");
        }
        const user = await getUser(userName);
        if (!user) {
            throw new Error("User not found");
        }
        await handler(cmdName, user, ...args);
    };
}