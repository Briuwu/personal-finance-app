"use server";

import { db } from "@/db";
import { budgets, TransactionInsert, transactions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Transaction = Omit<TransactionInsert, "userId" | "budgetId">;

export const getTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to view transactions");
  }

  const transactionsData = await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
  });

  return transactionsData;
};

export const createTransaction = async (transaction: Transaction) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to create a transaction");
  }

  const budgetId = await db
    .select({ id: budgets.id })
    .from(budgets)
    .where(eq(budgets.category, transaction.category))
    .execute();

  const transactionData = await db.insert(transactions).values({
    userId,
    budgetId: budgetId[0].id,
    amount: transaction.amount,
    name: transaction.name,
    category: transaction.category,
    recurring: transaction.recurring,
    date: transaction.date,
  });

  if (!transactionData) {
    throw new Error("Failed to create transaction");
  }

  revalidatePath("/transactions");
};
