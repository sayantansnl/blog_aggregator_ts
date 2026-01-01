import { getFeedByUrl } from "./lib/db/queries/feeds.js";
import { Feed, User } from "./types.js";
import { createFeedFollow } from "./lib/db/queries/feedFollows.js";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Not enough args for ${cmdName}`);
    }

    const url = args[0];
    const feed = await getFeedByUrl(url) as Feed;

    const newFeedFollow = await createFeedFollow(user.id, feed.id);

    console.log(`Username: ${newFeedFollow.userName}`);
    console.log(`Feedname: ${newFeedFollow.feedName}`);
}