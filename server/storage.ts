import { 
  users, type User, type InsertUser,
  hardware, type Hardware, type InsertHardware,
  tutorials, type Tutorial, type InsertTutorial,
  tools, type Tool, type InsertTool,
  projects, type Project, type InsertProject 
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private hardware: Map<number, Hardware>;
  private tutorials: Map<number, Tutorial>;
  private tools: Map<number, Tool>;
  private projects: Map<number, Project>;
  
  private currentUserId: number;
  private currentHardwareId: number;
  private currentTutorialId: number;
  private currentToolId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.hardware = new Map();
    this.tutorials = new Map();
    this.tools = new Map();
    this.projects = new Map();
    
    this.currentUserId = 1;
    this.currentHardwareId = 1;
    this.currentTutorialId = 1;
    this.currentToolId = 1;
    this.currentProjectId = 1;
    
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

export const storage = new MemStorage();
