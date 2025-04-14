import { pgTable, text, serial, integer, boolean, jsonb, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatarUrl: text("avatar_url"),
  isAdmin: boolean("is_admin").default(false),
  isVerified: boolean("is_verified").default(false),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
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
  firstName: true,
  lastName: true,
  avatarUrl: true,
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

// Achievements model
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // e.g., 'tutorial', 'project', 'social'
  points: integer("points").default(10),
  requirement: jsonb("requirement").$type<Record<string, any>>().notNull(), // e.g., {type: 'completeTutorials', count: 5}
  badgeUrl: text("badge_url"),
  tier: text("tier").notNull(), // e.g., 'bronze', 'silver', 'gold', 'platinum'
  createdAt: timestamp("created_at").defaultNow(),
});

// User Achievements model (join table between users and achievements)
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  progress: integer("progress").default(0), // For tracking partial completion
  isComplete: boolean("is_complete").default(false),
  notified: boolean("notified").default(false), // Whether user has been notified about this achievement
});

// Tutorial Progress model for tracking user's progress in tutorials
export const tutorialProgress = pgTable("tutorial_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  tutorialId: integer("tutorial_id").references(() => tutorials.id).notNull(),
  progress: integer("progress").default(0), // Percentage of completion (0-100)
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
  notes: text("notes"),
});

// Insert schemas for new tables
export const insertAchievementSchema = createInsertSchema(achievements).pick({
  name: true,
  description: true,
  icon: true,
  category: true,
  points: true, 
  requirement: true,
  badgeUrl: true,
  tier: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).pick({
  userId: true,
  achievementId: true,
  progress: true,
  isComplete: true,
});

export const insertTutorialProgressSchema = createInsertSchema(tutorialProgress).pick({
  userId: true,
  tutorialId: true,
  progress: true,
  notes: true,
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Achievement types
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;

// Course model
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  authorId: integer("author_id").references(() => users.id),
  duration: text("duration").notNull(),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  requirements: jsonb("requirements").$type<string[]>().notNull(),
  whatYoullLearn: jsonb("what_youll_learn").$type<string[]>().notNull(),
  isFeatured: boolean("is_featured").default(false),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course modules model
export const courseModules = pgTable("course_modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(), // To determine sequence of modules
  content: text("content").notNull(),
  duration: text("duration"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Courses (purchases) model
export const userCourses = pgTable("user_courses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // For subscription-based courses
  isPaid: boolean("is_paid").default(true),
  progress: integer("progress").default(0), // Overall progress percentage
  currentModuleId: integer("current_module_id"),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

// Merchandise model
export const merchandise = pgTable("merchandise", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  inventory: integer("inventory").default(0),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Order model
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, cancelled, refunded
  paymentMethod: text("payment_method"),
  billingAddress: jsonb("billing_address").$type<Record<string, string>>(),
  shippingAddress: jsonb("shipping_address").$type<Record<string, string>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Order items model (details of what's in each order)
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productType: text("product_type").notNull(), // "course" or "merchandise"
  productId: integer("product_id").notNull(), // References either courses.id or merchandise.id
  quantity: integer("quantity").notNull().default(1),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

// Insert schemas for new models
export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  price: true,
  imageUrl: true,
  authorId: true,
  duration: true,
  difficulty: true,
  category: true,
  tags: true,
  requirements: true,
  whatYoullLearn: true,
  isFeatured: true,
  isPublished: true,
});

export const insertCourseModuleSchema = createInsertSchema(courseModules).pick({
  courseId: true,
  title: true,
  description: true,
  order: true,
  content: true,
  duration: true,
  videoUrl: true,
});

export const insertUserCourseSchema = createInsertSchema(userCourses).pick({
  userId: true,
  courseId: true,
  expiresAt: true,
  isPaid: true,
});

export const insertMerchandiseSchema = createInsertSchema(merchandise).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  inventory: true,
  isAvailable: true,
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  totalAmount: true,
  status: true,
  paymentMethod: true,
  billingAddress: true,
  shippingAddress: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productType: true,
  productId: true,
  quantity: true,
  unitPrice: true,
  totalPrice: true,
});

// Types for new models
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertCourseModule = z.infer<typeof insertCourseModuleSchema>;
export type CourseModule = typeof courseModules.$inferSelect;

export type InsertUserCourse = z.infer<typeof insertUserCourseSchema>;
export type UserCourse = typeof userCourses.$inferSelect;

export type InsertMerchandise = z.infer<typeof insertMerchandiseSchema>;
export type Merchandise = typeof merchandise.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertTutorialProgress = z.infer<typeof insertTutorialProgressSchema>;
export type TutorialProgress = typeof tutorialProgress.$inferSelect;
