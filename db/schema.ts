import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("name").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
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
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  amount: numeric("amount", { precision: 100, scale: 2 }).notNull(),
  recurring: boolean("recurring").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  maximum: numeric("maximum", { precision: 100, scale: 2 }).notNull(),
  theme: text("theme").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const budgetsRelations = relations(budgets, ({ one }) => ({
  user: one(users, {
    fields: [budgets.userId],
    references: [users.id],
  }),
}));

export const pots = pgTable("pots", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  target: numeric("target", { precision: 100, scale: 2 }).notNull(),
  total: numeric("total", { precision: 100, scale: 2 }).notNull(),
  theme: text("theme").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const potsRelations = relations(pots, ({ one }) => ({
  user: one(users, {
    fields: [pots.userId],
    references: [users.id],
  }),
}));
