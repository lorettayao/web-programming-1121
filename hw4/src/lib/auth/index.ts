import NextAuth, { Session } from "next-auth";
import GitHub from "next-auth/providers/github";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub, CredentialsProvider],
  callbacks: {
    
    async session({ session }) {
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          provider: usersTable.provider,
        })
        .from(usersTable)
        .execute();

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };

      return {
        ...session,
        user: {
          id: user.id,
          username: user.username,
          provider: user.provider,
        },
      }; 
    },
    
    async jwt({ token, account }) {
      // Sign in with social account, e.g. GitHub, Google, etc.
      if (!account) return token;
      const { name } = token;
      const provider = account.provider;
      if (!name || !provider) return token;

      // Check if the email has been registered
      const [existedUser] = await db
        .select({
          id: usersTable.displayId,
        })
        .from(usersTable)
  
        .execute();
      if (existedUser) return token;
      if (provider !== "github") return token;

      // Sign up
      await db.insert(usersTable).values({
        username: name,
  
        provider,
      });

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
});
