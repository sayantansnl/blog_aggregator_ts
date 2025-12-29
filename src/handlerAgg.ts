import { fetchFeed } from "./lib/rss.js";

export async function handlerAgg(cmdName: string, ...args: string[]) {

    const inputUrl = "https://www.wagslane.dev/index.xml";
    const feed = await fetchFeed(inputUrl);

    console.log(JSON.stringify(feed, null, 2));
}