import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  isAdmin: boolean("is_admin").default(false),
});

// Hardware model
export const hardware = pgTable("hardware", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  specs: jsonb("specs").$type<Record<string, string>>(),
});

// Tutorial model
export const tutorials = pgTable("tutorials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  difficulty: text("difficulty").notNull(),
  imageUrl: text("image_url"),
  hardwareIds: jsonb("hardware_ids").$type<number[]>().notNull(),
  authorId: integer("author_id").references(() => users.id),
  duration: text("duration"),
  publishedAt: text("published_at"),
});

// Tool model
export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  command: text("command"),
  tags: jsonb("tags").$type<string[]>().notNull(),
  hardwareIds: jsonb("hardware_ids").$type<number[]>().notNull(),
});

// Project model
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  tag: text("tag").notNull(),
  authorId: integer("author_id").references(() => users.id),
  stars: integer("stars").default(0),
  hardwareIds: jsonb("hardware_ids").$type<number[]>().notNull(),
  tutorialId: integer("tutorial_id").references(() => tutorials.id),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertHardwareSchema = createInsertSchema(hardware).pick({
  name: true,
  description: true,
  imageUrl: true,
  category: true,
  tags: true,
  specs: true,
});

export const insertTutorialSchema = createInsertSchema(tutorials).pick({
  title: true,
  description: true,
  content: true,
  difficulty: true,
  imageUrl: true,
  hardwareIds: true,
  authorId: true,
  duration: true,
});

export const insertToolSchema = createInsertSchema(tools).pick({
  name: true,
  description: true,
  category: true,
  command: true,
  tags: true,
  hardwareIds: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  imageUrl: true,
  tag: true,
  authorId: true,
  hardwareIds: true,
  tutorialId: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHardware = z.infer<typeof insertHardwareSchema>;
export type Hardware = typeof hardware.$inferSelect;

export type InsertTutorial = z.infer<typeof insertTutorialSchema>;
export type Tutorial = typeof tutorials.$inferSelect;

export type InsertTool = z.infer<typeof insertToolSchema>;
export type Tool = typeof tools.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
