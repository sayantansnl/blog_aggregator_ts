import { db } from "..";
import { feedFollows, feeds } from "../schema";
import { users } from "../schema";
import { eq, and } from "drizzle-orm";

export async function createFeedFollow(userID: string, feedID: string) {
    const [newFeedFollow] = await db.insert(feedFollows).values({
        userId: userID,
        feedId: feedID
    }).returning();

    const [result] = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        userName: users.name,
        feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

    return result;
}

export async function getFeedFollowsForUser(userID: string) {
    const result = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        userName: users.name,
        feedName: feeds.name
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, userID))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id));
    return result;
}

export async function deleteFeedFollowRecord(userID: string, feedID: string) {
    await db.delete(feedFollows).where(and(eq(feedFollows.userId, userID), eq(feedFollows.feedId, feedID)));
}