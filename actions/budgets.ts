"use server";

import { db } from "@/db";
import { BudgetInsert, budgets } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
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
};

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
