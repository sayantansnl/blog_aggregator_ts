import { readConfig } from "./config.js";
import { getFeedFollowsForUser } from "./lib/db/queries/feedFollows";
import { getUser } from "./lib/db/queries/users.js";
import { User } from "./types.js";

export async function handlerFollowing(cmdName: string, ...args: string[]) {
    const config = readConfig();
    const userName = config.currentUserName;

    const user = await getUser(userName) as User;
    const feedFollows = await getFeedFollowsForUser(user.id);
    console.log(`FeedFollows for ${userName}`);

    for (const feedFollow of feedFollows) {
        console.log(`---- ${feedFollow.feedName}`);
    }
}