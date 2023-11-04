import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from "drizzle-orm";

console.log("Hello from the API");
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const handle = url.searchParams.get('handle');

  // Validate the handle
  if (!handle) {
    return new NextResponse(JSON.stringify({ error: "Handle is required" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Correct the select statement and the where condition
    const users = await db
    .select(usersTable.displayName)
    // Corrected: Selecting the displayName column
      .from(usersTable)
      .where(eq(usersTable.handle, handle)) // Corrected: Comparing the handle field with the provided handle
      .execute();

    // If no user is found, return a 404
    if (users.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Respond with the user's display name
    return new NextResponse(JSON.stringify({ displayName: users[0].displayName }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
