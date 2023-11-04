import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    // This query selects the id, handle, and display_name columns from the users table.
    const users = await db
    .select()
    .from(usersTable)
    .execute();


    // The results are returned as a JSON response with a 200 status code.
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // If there's an error, log it and return a 500 status code with an error message.
    console.error('Failed to fetch users:', error);
    
    return NextResponse.json(
      { error: "Something went wrong when trying to fetch users." },
      { status: 500 },
    );
  }
}
