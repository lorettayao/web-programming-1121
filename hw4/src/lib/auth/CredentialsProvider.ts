import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    
    username: { label: "Userame", type: "text", optional: true },
    // password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      
      username?: string;
      // password: string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const {  username} = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.displayId,
        username: usersTable.username,
        
        provider: usersTable.provider,
        // hashedPassword: usersTable.hashedPassword,
      })
      .from(usersTable)
      
      .execute();
    if (!existedUser) {
      // Sign up
      if (!username) {
        console.log("Name is required.");
        return null;
      }
      
      const [createdUser] = await db
        .insert(usersTable)
        .values({
          username,
          
          provider: "credentials",
        })
        .returning();
      return {
       
        name: createdUser.username,
        id: createdUser.displayId,
      };
    }

    

    
    return {
      
      name: existedUser.username,
      id: existedUser.id,
    };
  },
});
