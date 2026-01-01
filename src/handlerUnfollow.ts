import { deleteFeedFollowRecord } from "./lib/db/queries/feedFollows.js";
import { getFeedByUrl } from "./lib/db/queries/feeds.js";
import { Feed, User } from "./types.js";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Unknown number of args in ${cmdName}.`);
    }

    const feedUrl = args[0];
    const feed = await getFeedByUrl(feedUrl) as Feed;

    await deleteFeedFollowRecord(user.id, feed.id);
}