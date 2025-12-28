import { CommandHandler, CommandRegistry } from "./types.js";

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
    const handler = registry[cmdName];
    await handler(cmdName, ...args);
}