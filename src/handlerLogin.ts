import { setUser } from "./config.js";

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (!args.length) {
        throw new Error("the login handler expects a single argument");
    }

    setUser(args[0]);
    console.log("User has been set.");
}