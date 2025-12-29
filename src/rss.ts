import { XMLParser } from "fast-xml-parser"; 

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
        const data = await response.text();
        
        const parser = new XMLParser();
        let jsObj = parser.parse(data);

        if (!("channel" in jsObj.rss)) {
            throw new Error("Doesn't include a channel field");
        }

        const channel = jsObj.rss.channel;

        const title = channel?.title;
        const link = channel?.link;
        const description = channel?.description;
        let item = Array.isArray(channel?.item)? channel?.item : [];

        let cleanedItems = item.filter((el) => el.title && el.link && el.description && el.pubDate);
        let finalItems = cleanedItems.map((el) => {
            return {
                title: el.title,
                link: el.link,
                description: el.description,
                pubDate: el.pubDate
            };
        });
        
        const result = {
            channel: {
                title: title,
                link: link,
                description: description,
                item: finalItems
            }
        };
        return result;
    } catch (err) {
        console.log((err as Error).message);
    }
}