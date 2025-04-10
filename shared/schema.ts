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

// Article model
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  preview: text("preview").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  authorId: integer("author_id").references(() => users.id),
  publishedAt: text("published_at").notNull(),
  readTime: text("read_time").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  relatedArticleIds: jsonb("related_article_ids").$type<number[]>(),
  views: integer("views").default(0),
});

// Forum model
export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
  createdAt: text("created_at").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  replies: integer("replies").default(0),
  views: integer("views").default(0),
});

// Comments model
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
  tutorialId: integer("tutorial_id").references(() => tutorials.id),
  createdAt: text("created_at").notNull(),
  rating: integer("rating").default(0),
});

// User Profile model
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  expertise: text("expertise").notNull(),
  bio: text("bio"),
  skills: jsonb("skills").$type<string[]>().notNull(),
  completedTutorials: jsonb("completed_tutorials").$type<number[]>().notNull(),
  reputation: integer("reputation").default(0),
});

export const insertForumPostSchema = createInsertSchema(forumPosts).pick({
  title: true,
  content: true,
  authorId: true,
  tags: true,
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  content: true,
  authorId: true,
  tutorialId: true,
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  content: true,
  preview: true,
  category: true,
  imageUrl: true,
  authorId: true,
  readTime: true,
  tags: true,
  relatedArticleIds: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).pick({
  userId: true,
  expertise: true,
  bio: true,
  skills: true,
});

export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type ForumPost = typeof forumPosts.$inferSelect;

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
