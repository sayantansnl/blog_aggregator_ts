import { readConfig } from "./config.js";
import { printFeed } from "./helpers.js";
import { createFeed } from "./lib/db/queries/feeds.js";
import { getUser } from "./lib/db/queries/users.js";
import { Feed, User } from "./types.js";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`${cmdName} doesn't have enough args.`);
    }

    const feedName = args[0];
    const feedUrl = args[1];

    const config = readConfig();
    const currentUserName = config.currentUserName;
    const currentUser = await getUser(currentUserName);
    const currentUserId = currentUser?.id;

    if (typeof currentUserId === "undefined") {
        throw new Error("current user undefined");
    }

    const fetchedFeed = await createFeed(feedName, feedUrl, currentUserId);

    const user : User = currentUser as User;
    const feed : Feed = fetchedFeed as Feed;

    printFeed(feed, user);
}