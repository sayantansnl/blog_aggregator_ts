import { readConfig } from "./config.js";
import { getFeedByUrl } from "./lib/db/queries/feeds.js";
import { getUser } from "./lib/db/queries/users.js";
import { Feed, User } from "./types.js";
import { createFeedFollow } from "./lib/db/queries/feedFollows.js";

export async function handlerFollow(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`Not enough args for ${cmdName}`);
    }

    const url = args[0];
    const feed = await getFeedByUrl(url) as Feed;

    const config = readConfig();
    const userName = config.currentUserName;
    const user = await getUser(userName) as User;

    const newFeedFollow = await createFeedFollow(user.id, feed.id);

    console.log(`Username: ${newFeedFollow.userName}`);
    console.log(`Feedname: ${newFeedFollow.feedName}`);
}