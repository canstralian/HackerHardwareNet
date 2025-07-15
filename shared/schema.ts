import { pgTable, text, serial, integer, boolean, jsonb, timestamp, decimal, varchar } from "drizzle-orm/pg-core";
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
  publishedAt: true,
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

// Payment methods model
export const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // credit_card, paypal, etc.
  provider: text("provider"), // visa, mastercard, amex, etc.
  accountNumber: varchar("account_number", { length: 255 }), // Last 4 digits or tokenized version
  expiryDate: varchar("expiry_date", { length: 10 }),
  isDefault: boolean("is_default").default(false),
  billingAddress: jsonb("billing_address").$type<Record<string, string>>(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments model
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  status: text("status").notNull(), // pending, completed, failed, refunded
  paymentMethodId: integer("payment_method_id").references(() => paymentMethods.id),
  provider: text("provider").notNull(), // stripe, paypal, etc.
  transactionId: text("transaction_id"), // External payment provider transaction ID
  receiptUrl: text("receipt_url"),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subscriptions model
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  planId: integer("plan_id"), // References a plans table if you have one
  status: text("status").notNull(), // active, cancelled, suspended, etc.
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  paymentMethodId: integer("payment_method_id").references(() => paymentMethods.id),
  externalId: text("external_id"), // External subscription ID from provider
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Email Notifications model
export const emailNotifications = pgTable("email_notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // order_confirmation, receipt, shipping_update, etc.
  relatedId: integer("related_id"), // Could be order ID, payment ID, etc.
  relatedType: text("related_type"), // orders, payments, etc.
  status: text("status").notNull(), // queued, sent, failed, etc.
  recipientEmail: text("recipient_email").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for payment related tables
export const insertPaymentMethodSchema = createInsertSchema(paymentMethods).pick({
  userId: true,
  type: true,
  provider: true,
  accountNumber: true,
  expiryDate: true,
  isDefault: true,
  billingAddress: true,
  metadata: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  orderId: true,
  amount: true,
  currency: true,
  status: true,
  paymentMethodId: true,
  provider: true,
  transactionId: true,
  receiptUrl: true,
  errorMessage: true,
  metadata: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  planId: true,
  status: true,
  currentPeriodStart: true,
  currentPeriodEnd: true,
  cancelAtPeriodEnd: true,
  paymentMethodId: true,
  externalId: true,
  metadata: true,
});

export const insertEmailNotificationSchema = createInsertSchema(emailNotifications).pick({
  userId: true,
  type: true,
  relatedId: true,
  relatedType: true,
  status: true,
  recipientEmail: true,
  subject: true,
  content: true,
  sentAt: true,
  errorMessage: true,
  metadata: true,
});

// Types for payment related models
export type InsertPaymentMethod = z.infer<typeof insertPaymentMethodSchema>;
export type PaymentMethod = typeof paymentMethods.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export type InsertEmailNotification = z.infer<typeof insertEmailNotificationSchema>;
export type EmailNotification = typeof emailNotifications.$inferSelect;

// Community Security Challenges model
export const securityChallenges = pgTable("security_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  scenario: text("scenario").notNull(), // Detailed security scenario description
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced, expert
  category: text("category").notNull(), // hardware, network, web, IOT, etc.
  authorId: integer("author_id").references(() => users.id).notNull(),
  image: text("image_url"),
  hardwareIds: jsonb("hardware_ids").$type<number[]>(),
  tools: jsonb("tools").$type<string[]>(), // Required or suggested tools for the challenge
  points: integer("points").default(10),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  isActive: boolean("is_active").default(true),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  attempts: integer("attempts").default(0),
  solutions: integer("solutions").default(0),
});

// Challenge Solutions model
export const challengeSolutions = pgTable("challenge_solutions", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => securityChallenges.id).notNull(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  content: text("content").notNull(), // The solution write-up
  approach: text("approach").notNull(), // The approach taken to solve the challenge
  toolsUsed: jsonb("tools_used").$type<string[]>().notNull(), // Tools used to solve the challenge
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isApproved: boolean("is_approved").default(false),
  rating: integer("rating").default(0),
  codeSnippets: jsonb("code_snippets").$type<Record<string, string>>(), // Any code snippets included in the solution
  attachments: jsonb("attachments").$type<string[]>(), // URLs to any attached files
});

// Challenge Comments model
export const challengeComments = pgTable("challenge_comments", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => securityChallenges.id).notNull(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Challenge Progress model
export const userChallengeProgress = pgTable("user_challenge_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => securityChallenges.id).notNull(),
  status: text("status").notNull().default("started"), // started, in-progress, completed, abandoned
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  attempts: integer("attempts").default(1),
  notes: text("notes"), // User's private notes about the challenge
  bookmarked: boolean("bookmarked").default(false),
});

// Insert schemas for challenge-related tables
export const insertSecurityChallengeSchema = createInsertSchema(securityChallenges).pick({
  title: true,
  description: true,
  scenario: true,
  difficulty: true,
  category: true,
  authorId: true,
  image: true,
  hardwareIds: true,
  tools: true,
  points: true,
  tags: true,
  status: true,
  isActive: true,
});

export const insertChallengeSolutionSchema = createInsertSchema(challengeSolutions).pick({
  challengeId: true,
  authorId: true,
  content: true,
  approach: true,
  toolsUsed: true,
  isApproved: true,
  codeSnippets: true,
  attachments: true,
});

export const insertChallengeCommentSchema = createInsertSchema(challengeComments).pick({
  challengeId: true,
  authorId: true,
  content: true,
});

export const insertUserChallengeProgressSchema = createInsertSchema(userChallengeProgress).pick({
  userId: true,
  challengeId: true,
  status: true,
  completedAt: true,
  attempts: true,
  notes: true,
  bookmarked: true,
});

// Types for challenge-related models
export type InsertSecurityChallenge = z.infer<typeof insertSecurityChallengeSchema>;
export type SecurityChallenge = typeof securityChallenges.$inferSelect;

export type InsertChallengeSolution = z.infer<typeof insertChallengeSolutionSchema>;
export type ChallengeSolution = typeof challengeSolutions.$inferSelect;

export type InsertChallengeComment = z.infer<typeof insertChallengeCommentSchema>;
export type ChallengeComment = typeof challengeComments.$inferSelect;

export type InsertUserChallengeProgress = z.infer<typeof insertUserChallengeProgressSchema>;
export type UserChallengeProgress = typeof userChallengeProgress.$inferSelect;

// MCP (Model Context Protocol) Simulator Schema
export const mcpServers = pgTable("mcp_servers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  version: text("version").notNull().default("1.0.0"),
  status: text("status").notNull().default("inactive"), // active, inactive, error
  capabilities: jsonb("capabilities").$type<string[]>().notNull(),
  config: jsonb("config").$type<Record<string, any>>(),
  lastPing: timestamp("last_ping"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mcpResources = pgTable("mcp_resources", {
  id: serial("id").primaryKey(),
  serverId: integer("server_id").references(() => mcpServers.id).notNull(),
  uri: text("uri").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  mimeType: text("mime_type"),
  content: text("content"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mcpTools = pgTable("mcp_tools", {
  id: serial("id").primaryKey(),
  serverId: integer("server_id").references(() => mcpServers.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  schema: jsonb("schema").$type<Record<string, any>>().notNull(),
  examples: jsonb("examples").$type<Record<string, any>[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mcpContextExtractions = pgTable("mcp_context_extractions", {
  id: serial("id").primaryKey(),
  projectId: text("project_id").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  content: text("content").notNull(),
  extractedContext: jsonb("extracted_context").$type<Record<string, any>>().notNull(),
  dependencies: jsonb("dependencies").$type<string[]>(),
  functionSignatures: jsonb("function_signatures").$type<Record<string, any>[]>(),
  imports: jsonb("imports").$type<string[]>(),
  exports: jsonb("exports").$type<string[]>(),
  codeHash: text("code_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mcpGithubPRs = pgTable("mcp_github_prs", {
  id: serial("id").primaryKey(),
  prNumber: integer("pr_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  repoUrl: text("repo_url").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, merged, closed
  mcpData: jsonb("mcp_data").$type<Record<string, any>>(),
  extractedContext: jsonb("extracted_context").$type<Record<string, any>>(),
  botComments: jsonb("bot_comments").$type<Record<string, any>[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mcpWorkflows = pgTable("mcp_workflows", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  trigger: text("trigger").notNull(), // manual, schedule, webhook
  steps: jsonb("steps").$type<Record<string, any>[]>().notNull(),
  status: text("status").notNull().default("inactive"), // active, inactive, running, completed, failed
  lastRun: timestamp("last_run"),
  nextRun: timestamp("next_run"),
  runCount: integer("run_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas for MCP tables
export const insertMcpServerSchema = createInsertSchema(mcpServers).pick({
  name: true,
  description: true,
  url: true,
  version: true,
  status: true,
  capabilities: true,
  config: true,
});

export const insertMcpResourceSchema = createInsertSchema(mcpResources).pick({
  serverId: true,
  uri: true,
  name: true,
  description: true,
  mimeType: true,
  content: true,
  metadata: true,
});

export const insertMcpToolSchema = createInsertSchema(mcpTools).pick({
  serverId: true,
  name: true,
  description: true,
  schema: true,
  examples: true,
});

export const insertMcpContextExtractionSchema = createInsertSchema(mcpContextExtractions).pick({
  projectId: true,
  fileName: true,
  filePath: true,
  content: true,
  extractedContext: true,
  dependencies: true,
  functionSignatures: true,
  imports: true,
  exports: true,
  codeHash: true,
});

export const insertMcpGithubPRSchema = createInsertSchema(mcpGithubPRs).pick({
  prNumber: true,
  title: true,
  description: true,
  repoUrl: true,
  status: true,
  mcpData: true,
  extractedContext: true,
  botComments: true,
});

export const insertMcpWorkflowSchema = createInsertSchema(mcpWorkflows).pick({
  name: true,
  description: true,
  trigger: true,
  steps: true,
  status: true,
  nextRun: true,
});

// Types for MCP models
export type InsertMcpServer = z.infer<typeof insertMcpServerSchema>;
export type McpServer = typeof mcpServers.$inferSelect;

export type InsertMcpResource = z.infer<typeof insertMcpResourceSchema>;
export type McpResource = typeof mcpResources.$inferSelect;

export type InsertMcpTool = z.infer<typeof insertMcpToolSchema>;
export type McpTool = typeof mcpTools.$inferSelect;

export type InsertMcpContextExtraction = z.infer<typeof insertMcpContextExtractionSchema>;
export type McpContextExtraction = typeof mcpContextExtractions.$inferSelect;

export type InsertMcpGithubPR = z.infer<typeof insertMcpGithubPRSchema>;
export type McpGithubPR = typeof mcpGithubPRs.$inferSelect;

export type InsertMcpWorkflow = z.infer<typeof insertMcpWorkflowSchema>;
export type McpWorkflow = typeof mcpWorkflows.$inferSelect;
