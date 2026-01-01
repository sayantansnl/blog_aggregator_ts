import { InferSelectModel } from "drizzle-orm";
import { feeds, users } from "./lib/db/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandRegistry = Record<string, CommandHandler>;

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export type User = InferSelectModel<typeof users>;
export type Feed = InferSelectModel<typeof feeds>;
//export type FeedFollow = InferSelectModel<typeof feedFollows>;