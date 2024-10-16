import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
