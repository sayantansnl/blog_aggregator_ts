import { deleteUsers } from "./lib/db/queries/users.js";

export async function handlerReset(cmdName: string, ...args: string[]) {
    try {
        await deleteUsers();
        console.log("Reset successful.");
    }
    catch (err) {
        console.log((err as Error).message);
    }
}