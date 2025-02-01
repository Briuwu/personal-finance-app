"use server";

import { db } from "@/db";
import { PotInsert, pots } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getAllPots = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to view pots");
  }

  const potsData = await db.query.pots.findMany({
    where: eq(pots.userId, userId),
    orderBy: (pots, { desc }) => [desc(pots.createdAt)],
  });

  if (!potsData) {
    return [];
  }

  return potsData;
});

type CreatePot = Omit<PotInsert, "userId" | "total">;

export const createPot = async (data: CreatePot) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to create a pot");
  }

  await db.insert(pots).values({
    userId,
    total: "0",
    name: data.name,
    target: data.target,
    theme: data.theme,
  });

  revalidatePath("/pots");
};

export const addMoney = async (potId: number, amount: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to add money to a pot");
  }

  const pot = await db.query.pots.findFirst({
    where: and(eq(pots.userId, userId), eq(pots.id, potId)),
    columns: {
      total: true,
    },
  });

  await db
    .update(pots)
    .set({
      total: String(Number(pot!.total) + Number(amount)),
    })
    .where(and(eq(pots.userId, userId), eq(pots.id, potId)));

  revalidatePath("/pots");
};

export const withdrawMoney = async (potId: number, amount: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to withdraw money from a pot");
  }

  const pot = await db.query.pots.findFirst({
    where: and(eq(pots.userId, userId), eq(pots.id, potId)),
    columns: {
      total: true,
    },
  });

  await db
    .update(pots)
    .set({
      total: String(Number(pot!.total) - Number(amount)),
    })
    .where(and(eq(pots.userId, userId), eq(pots.id, potId)));

  revalidatePath("/pots");
};
