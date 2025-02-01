"use server";

import { db } from "@/db";
import { BudgetInsert, budgets } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

type Budget = Omit<BudgetInsert, "userId">;

export const createBudget = async (budget: Budget) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to create a budget");
  }

  await db.insert(budgets).values({
    userId,
    category: budget.category,
    maximum: budget.maximum,
    theme: budget.theme,
  });

  revalidatePath("/budgets");
};

export const getBudgets = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to get budgets");
  }

  const budgetsData = await db.query.budgets.findMany({
    where: eq(budgets.userId, userId),
    with: {
      transactions: {
        orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
      },
    },
    orderBy: (budgets, { desc }) => [desc(budgets.createdAt)],
  });

  const transformedBudgets = budgetsData.map((budget) => {
    const totalSpent = budget.transactions.reduce(
      (acc, transaction) => acc + Number(transaction.amount),
      0,
    );
    return {
      id: budget.id,
      category: budget.category,
      maximum: budget.maximum,
      theme: budget.theme,
      amount: totalSpent,
      transactions: budget.transactions,
    };
  });

  return transformedBudgets;
});

export const getBudgetCategories = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to get budget categories");
  }

  const categories = await db
    .select({ category: budgets.category })
    .from(budgets)
    .execute();

  return categories.map((category) => category.category);
});
