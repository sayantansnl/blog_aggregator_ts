import { XMLParser } from "fast-xml-parser"; 
import { RSSFeed, RSSItem } from "../types.js";

export async function fetchFeed(url: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "gator"
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xml = await response.text();
        
        const parser = new XMLParser();
        let jsObj = parser.parse(xml);

        if (!("channel" in jsObj.rss)) {
            throw new Error("Doesn't include a channel field");
        }

        const channel = jsObj.rss?.channel;

        if (!channel) {
            throw new Error("Failed to parse channel");
        }

        const title = channel?.title;
        const link = channel?.link;
        const description = channel?.description;
        let item = Array.isArray(channel?.item)? channel?.item : [];

        const rssItems: RSSItem[] = [];

        for (const i of item) {
            if (!i.title || !i.link || !i.description || !i.pubDate) {
                continue;
            }

            rssItems.push({
                title: i.title,
                link: i.link,
                description: i.description,
                pubDate: i.pubDate
            });
        }

        const feed: RSSFeed = {
            channel: {
                title: title,
                link: link,
                description: description,
                item: rssItems
            }
        };
        return feed;
    } catch (err) {
        console.log((err as Error).message);
    }
}