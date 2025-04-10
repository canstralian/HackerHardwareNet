import { 
  users, type User, type InsertUser,
  hardware, type Hardware, type InsertHardware,
  tutorials, type Tutorial, type InsertTutorial,
  tools, type Tool, type InsertTool,
  projects, type Project, type InsertProject,
  forumPosts, type ForumPost, type InsertForumPost,
  comments, type Comment, type InsertComment,
  userProfiles, type UserProfile, type InsertUserProfile,
  articles, type Article, type InsertArticle
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pg from "pg";

export interface IStorage {
  // User CRUD
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Hardware CRUD
  getHardware(id: number): Promise<Hardware | undefined>;
  getAllHardware(): Promise<Hardware[]>;
  getHardwareByCategory(category: string): Promise<Hardware[]>;
  createHardware(hardware: InsertHardware): Promise<Hardware>;
  
  // Tutorial CRUD
  getTutorial(id: number): Promise<Tutorial | undefined>;
  getAllTutorials(): Promise<Tutorial[]>;
  getTutorialsByDifficulty(difficulty: string): Promise<Tutorial[]>;
  getTutorialsByHardware(hardwareId: number): Promise<Tutorial[]>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
  
  // Tool CRUD
  getTool(id: number): Promise<Tool | undefined>;
  getAllTools(): Promise<Tool[]>;
  getToolsByCategory(category: string): Promise<Tool[]>;
  getToolsByHardware(hardwareId: number): Promise<Tool[]>;
  createTool(tool: InsertTool): Promise<Tool>;
  
  // Project CRUD
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByTag(tag: string): Promise<Project[]>;
  getProjectsByAuthor(authorId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProjectStars(id: number, stars: number): Promise<Project | undefined>;
  
  // Forum CRUD
  getForumPost(id: number): Promise<ForumPost | undefined>;
  getAllForumPosts(): Promise<ForumPost[]>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  
  // Comment CRUD
  getComment(id: number): Promise<Comment | undefined>;
  getTutorialComments(tutorialId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Article CRUD
  getArticle(id: number): Promise<Article | undefined>;
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  incrementArticleViews(id: number): Promise<Article | undefined>;
  
  // User Profile CRUD
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  
  // Achievement CRUD
  getAchievement(id: number): Promise<Achievement | undefined>;
  getAllAchievements(): Promise<Achievement[]>;
  getAchievementsByCategory(category: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // User Achievement CRUD
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  getUserAchievement(userId: number, achievementId: number): Promise<UserAchievement | undefined>;
  createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
  updateUserAchievementProgress(id: number, progress: number): Promise<UserAchievement | undefined>;
  completeUserAchievement(id: number): Promise<UserAchievement | undefined>;
  
  // Tutorial Progress CRUD
  getTutorialProgress(userId: number, tutorialId: number): Promise<TutorialProgress | undefined>;
  getUserTutorialProgress(userId: number): Promise<TutorialProgress[]>;
  createTutorialProgress(progress: InsertTutorialProgress): Promise<TutorialProgress>;
  updateTutorialProgress(userId: number, tutorialId: number, progress: number): Promise<TutorialProgress | undefined>;
  completeTutorial(userId: number, tutorialId: number): Promise<TutorialProgress | undefined>;
  
  // Achievement checking
  checkAndAwardAchievements(userId: number): Promise<UserAchievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private hardware: Map<number, Hardware>;
  private tutorials: Map<number, Tutorial>;
  private tools: Map<number, Tool>;
  private projects: Map<number, Project>;
  private forumPosts: Map<number, ForumPost>;
  private comments: Map<number, Comment>;
  private userProfiles: Map<number, UserProfile>;
  private articles: Map<number, Article>;
  private achievements: Map<number, Achievement>;
  private userAchievements: Map<number, UserAchievement>;
  private tutorialProgress: Map<number, TutorialProgress>;
  
  private currentUserId: number;
  private currentHardwareId: number;
  private currentTutorialId: number;
  private currentToolId: number;
  private currentProjectId: number;
  private currentForumPostId: number;
  private currentCommentId: number;
  private currentProfileId: number;
  private currentArticleId: number;
  private currentAchievementId: number;
  private currentUserAchievementId: number;
  private currentTutorialProgressId: number;

  constructor() {
    this.users = new Map();
    this.hardware = new Map();
    this.tutorials = new Map();
    this.tools = new Map();
    this.projects = new Map();
    this.forumPosts = new Map();
    this.comments = new Map();
    this.userProfiles = new Map();
    this.articles = new Map();
    this.achievements = new Map();
    this.userAchievements = new Map();
    this.tutorialProgress = new Map();
    
    this.currentUserId = 1;
    this.currentHardwareId = 1;
    this.currentTutorialId = 1;
    this.currentToolId = 1;
    this.currentProjectId = 1;
    this.currentForumPostId = 1;
    this.currentCommentId = 1;
    this.currentProfileId = 1;
    this.currentArticleId = 1;
    this.currentAchievementId = 1;
    this.currentUserAchievementId = 1;
    this.currentTutorialProgressId = 1;
    
    // Initialize with some demo data
    this.initializeDemoData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }
  
  // Hardware methods
  async getHardware(id: number): Promise<Hardware | undefined> {
    return this.hardware.get(id);
  }
  
  async getAllHardware(): Promise<Hardware[]> {
    return Array.from(this.hardware.values());
  }
  
  async getHardwareByCategory(category: string): Promise<Hardware[]> {
    return Array.from(this.hardware.values()).filter(
      (hw) => hw.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  async createHardware(insertHardware: InsertHardware): Promise<Hardware> {
    const id = this.currentHardwareId++;
    const hardware: Hardware = { 
      ...insertHardware, 
      id,
      imageUrl: insertHardware.imageUrl || null,
      specs: insertHardware.specs || null,
      tags: Array.isArray(insertHardware.tags) ? insertHardware.tags : []
    };
    this.hardware.set(id, hardware);
    return hardware;
  }
  
  // Tutorial methods
  async getTutorial(id: number): Promise<Tutorial | undefined> {
    return this.tutorials.get(id);
  }
  
  async getAllTutorials(): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values());
  }
  
  async getTutorialsByDifficulty(difficulty: string): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values()).filter(
      (tutorial) => tutorial.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }
  
  async getTutorialsByHardware(hardwareId: number): Promise<Tutorial[]> {
    return Array.from(this.tutorials.values()).filter(
      (tutorial) => tutorial.hardwareIds.includes(hardwareId)
    );
  }
  
  async createTutorial(insertTutorial: InsertTutorial): Promise<Tutorial> {
    const id = this.currentTutorialId++;
    const tutorial: Tutorial = { 
      ...insertTutorial, 
      id, 
      publishedAt: new Date().toISOString(),
      imageUrl: insertTutorial.imageUrl || null,
      duration: insertTutorial.duration || null,
      authorId: insertTutorial.authorId || null,
      hardwareIds: Array.isArray(insertTutorial.hardwareIds) ? insertTutorial.hardwareIds : []
    };
    this.tutorials.set(id, tutorial);
    return tutorial;
  }
  
  // Tool methods
  async getTool(id: number): Promise<Tool | undefined> {
    return this.tools.get(id);
  }
  
  async getAllTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }
  
  async getToolsByCategory(category: string): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(
      (tool) => tool.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  async getToolsByHardware(hardwareId: number): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(
      (tool) => tool.hardwareIds.includes(hardwareId)
    );
  }
  
  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = { 
      ...insertTool, 
      id,
      command: insertTool.command || null,
      tags: Array.isArray(insertTool.tags) ? insertTool.tags : [],
      hardwareIds: Array.isArray(insertTool.hardwareIds) ? insertTool.hardwareIds : []
    };
    this.tools.set(id, tool);
    return tool;
  }
  
  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProjectsByTag(tag: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.tag.toLowerCase() === tag.toLowerCase()
    );
  }
  
  async getProjectsByAuthor(authorId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.authorId === authorId
    );
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id, 
      stars: 0,
      imageUrl: insertProject.imageUrl || null,
      authorId: insertProject.authorId || null,
      tutorialId: insertProject.tutorialId || null,
      hardwareIds: Array.isArray(insertProject.hardwareIds) ? insertProject.hardwareIds : []
    };
    this.projects.set(id, project);
    return project;
  }
  
  async updateProjectStars(id: number, stars: number): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, stars };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  // Helper method to initialize demo data
  // Forum methods
async getForumPost(id: number): Promise<ForumPost | undefined> {
  return Array.from(this.forumPosts.values()).find(post => post.id === id);
}

async getAllForumPosts(): Promise<ForumPost[]> {
  return Array.from(this.forumPosts.values());
}

async createForumPost(insertForumPost: InsertForumPost): Promise<ForumPost> {
  const id = this.currentForumPostId++;
  const post: ForumPost = {
    ...insertForumPost,
    id,
    createdAt: new Date().toISOString(),
    replies: 0,
    views: 0
  };
  this.forumPosts.set(id, post);
  return post;
}

// Comments methods
async getComment(id: number): Promise<Comment | undefined> {
  return Array.from(this.comments.values()).find(comment => comment.id === id);
}

async getTutorialComments(tutorialId: number): Promise<Comment[]> {
  return Array.from(this.comments.values()).filter(
    comment => comment.tutorialId === tutorialId
  );
}

async createComment(insertComment: InsertComment): Promise<Comment> {
  const id = this.currentCommentId++;
  const comment: Comment = {
    ...insertComment,
    id,
    createdAt: new Date().toISOString(),
    rating: 0
  };
  this.comments.set(id, comment);
  return comment;
}

// Article methods  
async getArticle(id: number): Promise<Article | undefined> {
  return this.articles.get(id);
}

async getAllArticles(): Promise<Article[]> {
  return Array.from(this.articles.values());
}

async getArticlesByCategory(category: string): Promise<Article[]> {
  return Array.from(this.articles.values()).filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );
}

async createArticle(insertArticle: InsertArticle): Promise<Article> {
  const id = this.currentArticleId++;
  const article: Article = {
    ...insertArticle,
    id,
    publishedAt: new Date().toISOString(),
    imageUrl: insertArticle.imageUrl || null,
    authorId: insertArticle.authorId || null,
    tags: Array.isArray(insertArticle.tags) ? insertArticle.tags : [],
    relatedArticleIds: Array.isArray(insertArticle.relatedArticleIds) ? insertArticle.relatedArticleIds : null,
    views: 0
  };
  this.articles.set(id, article);
  return article;
}

async incrementArticleViews(id: number): Promise<Article | undefined> {
  const article = this.articles.get(id);
  if (!article) return undefined;
  
  const newViews = (article.views || 0) + 1;
  const updatedArticle = { ...article, views: newViews };
  this.articles.set(id, updatedArticle);
  return updatedArticle;
}

// User Profile methods
async getUserProfile(userId: number): Promise<UserProfile | undefined> {
  return Array.from(this.userProfiles.values()).find(
    profile => profile.userId === userId
  );
}

async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
  const id = this.currentProfileId++;
  const profile: UserProfile = {
    ...insertProfile,
    id,
    completedTutorials: [],
    reputation: 0
  };
  this.userProfiles.set(id, profile);
  return profile;
}

private initializeDemoData() {
    // Add demo user
    const adminUser: InsertUser = {
      username: 'admin',
      password: 'password123', // In a real app, this would be hashed
      email: 'admin@hackerboard.com'
    };
    this.createUser(adminUser);
    
    // Add demo data for testing
    // (In production, this method would be removed)
  }
}

export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  
  constructor() {
    const client = new pg.Client(process.env.DATABASE_URL);
    client.connect();
    this.db = drizzle(client);
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Hardware methods
  async getHardware(id: number): Promise<Hardware | undefined> {
    const result = await this.db.select().from(hardware).where(eq(hardware.id, id)).limit(1);
    return result[0];
  }
  
  async getAllHardware(): Promise<Hardware[]> {
    return this.db.select().from(hardware);
  }
  
  async getHardwareByCategory(category: string): Promise<Hardware[]> {
    return this.db.select().from(hardware).where(eq(hardware.category, category));
  }
  
  async createHardware(hardwareItem: InsertHardware): Promise<Hardware> {
    const result = await this.db.insert(hardware).values(hardwareItem).returning();
    return result[0];
  }
  
  // Tutorial methods
  async getTutorial(id: number): Promise<Tutorial | undefined> {
    const result = await this.db.select().from(tutorials).where(eq(tutorials.id, id)).limit(1);
    return result[0];
  }
  
  async getAllTutorials(): Promise<Tutorial[]> {
    return this.db.select().from(tutorials);
  }
  
  async getTutorialsByDifficulty(difficulty: string): Promise<Tutorial[]> {
    return this.db.select().from(tutorials).where(eq(tutorials.difficulty, difficulty));
  }
  
  async getTutorialsByHardware(hardwareId: number): Promise<Tutorial[]> {
    const result = await this.db.select().from(tutorials);
    return result.filter(tutorial => tutorial.hardwareIds.includes(hardwareId));
  }
  
  async createTutorial(tutorial: InsertTutorial): Promise<Tutorial> {
    const tutorialWithDate = {
      ...tutorial,
      publishedAt: new Date().toISOString()
    };
    const result = await this.db.insert(tutorials).values(tutorialWithDate).returning();
    return result[0];
  }
  
  // Tool methods
  async getTool(id: number): Promise<Tool | undefined> {
    const result = await this.db.select().from(tools).where(eq(tools.id, id)).limit(1);
    return result[0];
  }
  
  async getAllTools(): Promise<Tool[]> {
    return this.db.select().from(tools);
  }
  
  async getToolsByCategory(category: string): Promise<Tool[]> {
    return this.db.select().from(tools).where(eq(tools.category, category));
  }
  
  async getToolsByHardware(hardwareId: number): Promise<Tool[]> {
    const result = await this.db.select().from(tools);
    return result.filter(tool => tool.hardwareIds.includes(hardwareId));
  }
  
  async createTool(tool: InsertTool): Promise<Tool> {
    const result = await this.db.insert(tools).values(tool).returning();
    return result[0];
  }
  
  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }
  
  async getAllProjects(): Promise<Project[]> {
    return this.db.select().from(projects);
  }
  
  async getProjectsByTag(tag: string): Promise<Project[]> {
    return this.db.select().from(projects).where(eq(projects.tag, tag));
  }
  
  async getProjectsByAuthor(authorId: number): Promise<Project[]> {
    return this.db.select().from(projects).where(eq(projects.authorId, authorId));
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(project).returning();
    return result[0];
  }
  
  async updateProjectStars(id: number, stars: number): Promise<Project | undefined> {
    const result = await this.db
      .update(projects)
      .set({ stars })
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }
  
  // Forum methods
  async getForumPost(id: number): Promise<ForumPost | undefined> {
    const result = await this.db.select().from(forumPosts).where(eq(forumPosts.id, id)).limit(1);
    return result[0];
  }
  
  async getAllForumPosts(): Promise<ForumPost[]> {
    return this.db.select().from(forumPosts);
  }
  
  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    const postWithDate = {
      ...post,
      createdAt: new Date().toISOString(),
      replies: 0,
      views: 0
    };
    const result = await this.db.insert(forumPosts).values(postWithDate).returning();
    return result[0];
  }
  
  // Comment methods
  async getComment(id: number): Promise<Comment | undefined> {
    const result = await this.db.select().from(comments).where(eq(comments.id, id)).limit(1);
    return result[0];
  }
  
  async getTutorialComments(tutorialId: number): Promise<Comment[]> {
    return this.db.select().from(comments).where(eq(comments.tutorialId, tutorialId));
  }
  
  async createComment(comment: InsertComment): Promise<Comment> {
    const commentWithDate = {
      ...comment,
      createdAt: new Date().toISOString(),
      rating: 0
    };
    const result = await this.db.insert(comments).values(commentWithDate).returning();
    return result[0];
  }
  
  // Article methods
  async getArticle(id: number): Promise<Article | undefined> {
    const result = await this.db.select().from(articles).where(eq(articles.id, id)).limit(1);
    return result[0];
  }
  
  async getAllArticles(): Promise<Article[]> {
    return this.db.select().from(articles);
  }
  
  async getArticlesByCategory(category: string): Promise<Article[]> {
    return this.db.select().from(articles).where(eq(articles.category, category));
  }
  
  async createArticle(article: InsertArticle): Promise<Article> {
    const now = new Date().toISOString();
    const articleWithDate = {
      ...article,
      publishedAt: now
    };
    const result = await this.db.insert(articles).values(articleWithDate).returning();
    return result[0];
  }
  
  async incrementArticleViews(id: number): Promise<Article | undefined> {
    const article = await this.getArticle(id);
    if (!article) return undefined;
    
    const newViews = (article.views || 0) + 1;
    const result = await this.db
      .update(articles)
      .set({ views: newViews })
      .where(eq(articles.id, id))
      .returning();
    return result[0];
  }
  
  // User Profile methods
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const result = await this.db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
    return result[0];
  }
  
  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const profileWithDefaults = {
      ...profile,
      completedTutorials: [],
      reputation: 0
    };
    const result = await this.db.insert(userProfiles).values(profileWithDefaults).returning();
    return result[0];
  }
}

// Use PostgreSQL storage in production, MemStorage for development/testing
export const storage = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL
  ? new PostgresStorage()
  : new MemStorage();
