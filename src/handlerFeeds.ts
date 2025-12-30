import { getFeeds } from "./lib/db/queries/feeds.js";

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    const feeds = await getFeeds();

    for (const feed of feeds) {
        console.log(`FeedName: ${feed.feedName}`);
        console.log(`FeedURL: ${feed.feedUrl}`);
        console.log(`UserName: ${feed.userName}`);
    }
}