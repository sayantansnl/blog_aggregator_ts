import { CommandHandler, CommandRegistry } from "./types.js";
import process from "node:process";

export function registerCommand(
    registry: CommandRegistry,
    cmdName: string,
    handler: CommandHandler
) {
    registry[cmdName] = handler;
}

export async function runCommand(
    registry: CommandRegistry,
    cmdName: string,
    ...args: string[]
): Promise<void> {
    if (!args.length) {
        console.log("Not enough arguments to run said command.");
        process.exit(1);
    }

    const handler = registry[cmdName];
    await handler(cmdName, ...args);
}