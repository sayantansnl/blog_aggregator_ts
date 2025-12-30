import { Feed, User } from "./types.js";

export function printFeed(feed: Feed, user: User) {
    console.log("------Feed------");
    console.log(feed);
    console.log("------User------");
    console.log(user);
}