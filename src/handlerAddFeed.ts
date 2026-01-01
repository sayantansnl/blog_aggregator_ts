import { printFeed } from "./helpers.js";
import { createFeed } from "./lib/db/queries/feeds.js";
import { Feed, User } from "./types.js";
import { createFeedFollow } from "./lib/db/queries/feedFollows.js";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 2) {
        throw new Error(`${cmdName} doesn't have enough args.`);
    }

    const feedName = args[0];
    const feedUrl = args[1];

    const fetchedFeed = await createFeed(feedName, feedUrl, user.id);

    
    const feed : Feed = fetchedFeed as Feed;

    await createFeedFollow(user.id, feed.id);

    printFeed(feed, user);
}