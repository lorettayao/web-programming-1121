// "use client";
import { eq, desc, isNull, sql } from "drizzle-orm";

import NameDialog from "@/components/NameDialog";
import Tweet from "@/components/Tweet";
import TweetInput from "@/components/TweetInput";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn, validateHandle, validateUsername } from "@/lib/utils";
// import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

type HomePageProps = {
  searchParams: {
    username?: string;
    handle?: string;
  };
};

export default async function Home({
  searchParams: { username, handle },
}: HomePageProps) {
  // read the username and handle from the query params and insert the user
  // if needed.
  if (username && handle) {
    await db
      .insert(usersTable)
      .values({
        displayName: username,
        handle,
      })
      // Since handle is a unique column, we need to handle the case
      // where the user already exists. We can do this with onConflictDoUpdate
      // If the user already exists, we just update the display name
      // This way we don't have to worry about checking if the user exists
      // before inserting them.
      .onConflictDoUpdate({
        target: usersTable.handle,
        set: {
          displayName: username,
        },
      })
      .execute();
  }

  
  // )
  const likesSubquery = db.$with("likes_count").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        // some times we need to do some custom logic in sql
        // although drizzle-orm is very powerful, it doesn't support every possible
        // SQL query. In these cases, we can use the sql template literal tag
        // to write raw SQL queries.
        // read more about it here: https://orm.drizzle.team/docs/sql
        likes: sql<number | null>`count(*)`.mapWith(Number).as("likes"),
      })
      .from(likesTable)
      .groupBy(likesTable.tweetId),
  );

 
  const likedSubquery = db.$with("liked").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        // this is a way to make a boolean column (kind of) in SQL
        // so when this column is joined with the tweets table, we will
        // get a constant 1 if the user liked the tweet, and null otherwise
        // we can then use the mapWith(Boolean) function to convert the
        // constant 1 to true, and null to false
        liked: sql<number>`1`.mapWith(Boolean).as("liked"),
      })
      .from(likesTable)
      .where(eq(likesTable.userHandle, handle ?? "")),
  );

  const tweets = await db
    .with(likesSubquery, likedSubquery)
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: tweetsTable.createdAt,
      liked: likedSubquery.liked,
    })
    .from(tweetsTable)
    .where(isNull(tweetsTable.replyToTweetId))
    .orderBy(desc(tweetsTable.createdAt))
    // JOIN is by far the most powerful feature of relational databases
    // it allows us to combine data from multiple tables into a single query
    // read more about it here: https://orm.drizzle.team/docs/select#join
    // or watch this video:
    // https://planetscale.com/learn/courses/mysql-for-developers/queries/an-overview-of-joins
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .leftJoin(likedSubquery, eq(tweetsTable.id, likedSubquery.tweetId))
    .execute();
  
  return (
    <>
      <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
        <h1 className="mb-2 bg-white px-4 text-xl font-bold">揪團</h1>
        <div>
          {/* add name here */}
          
        </div>
        <div className="w-full px-4 pt-3">
          <TweetInput />
        </div>
        <Separator />
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            username={username}
            handle={handle}
            authorName={tweet.username}
            authorHandle={tweet.handle}
            content={tweet.content}
            likes={tweet.likes}
            liked={tweet.liked}
            createdAt={tweet.createdAt!}
          />
        ))}
      </div>
      <NameDialog />
    </>
  );
}
