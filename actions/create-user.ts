"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function createUsername(username: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  await db.insert(users).values({
    userId: userId,
    name: username,
  });
}
