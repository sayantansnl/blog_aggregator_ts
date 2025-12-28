import { readConfig } from "./config.js";
import { getUsers } from "./lib/db/queries/users.js";

export async function handlerGetUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const cfg = readConfig();

    for (const user of users) {
        if (user.name === cfg.currentUserName) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }
}