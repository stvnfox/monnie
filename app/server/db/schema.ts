import {
  boolean,
  date,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { PORTFOLIO_TYPES, type PortfolioType } from "~/types/portfolios";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: text("email").notNull().unique(),
});

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type")
    .notNull()
    .default(PORTFOLIO_TYPES.PERSONAL)
    .$type<PortfolioType>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portfolioShares = pgTable("portfolio_shares", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id")
    .references(() => portfolios.id)
    .notNull(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  canEdit: boolean("can_edit").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'income' or 'expense'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id")
    .references(() => portfolios.id)
    .notNull(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
