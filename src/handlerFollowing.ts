import { getFeedFollowsForUser } from "./lib/db/queries/feedFollows";
import { User } from "./types.js";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {
    const feedFollows = await getFeedFollowsForUser(user.id);
    console.log(`FeedFollows for ${user.name}`);

    for (const feedFollow of feedFollows) {
        console.log(`---- ${feedFollow.feedName}`);
    }
}