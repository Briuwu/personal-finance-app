import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
  budgets: many(budgets),
  pots: many(pots),
}));

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  budgetId: integer("budget_id")
    .notNull()
    .references(() => budgets.id, {
      onDelete: "cascade",
    }),
  category: text("category").notNull(),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 100, scale: 2 }).notNull(),
  recurring: boolean("recurring").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.userId],
  }),
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
}));

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  category: text("category").notNull(),
  maximum: numeric("maximum", { precision: 100, scale: 2 }).notNull(),
  theme: text("theme").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const budgetsRelations = relations(budgets, ({ one, many }) => ({
  user: one(users, {
    fields: [budgets.userId],
    references: [users.userId],
  }),
  transactions: many(transactions),
}));

export const pots = pgTable("pots", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  name: text("name").notNull(),
  target: numeric("target", { precision: 100, scale: 2 }).notNull(),
  total: numeric("total", { precision: 100, scale: 2 }).notNull(),
  theme: text("theme").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const potsRelations = relations(pots, ({ one }) => ({
  user: one(users, {
    fields: [pots.userId],
    references: [users.userId],
  }),
}));

export type BudgetInsert = typeof budgets.$inferInsert;
export type BudgetSelect = typeof budgets.$inferSelect;

export type TransactionInsert = typeof transactions.$inferInsert;
export type TransactionSelect = typeof transactions.$inferSelect;
