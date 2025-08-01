import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { passport, isAuthenticated, isAdmin } from "./auth";
import bcrypt from "bcrypt";
import { 
  insertUserSchema, 
  insertHardwareSchema, 
  insertTutorialSchema, 
  insertToolSchema, 
  insertProjectSchema,
  insertForumPostSchema,
  insertCommentSchema,
  insertUserProfileSchema,
  insertArticleSchema,
  insertAchievementSchema,
  insertUserAchievementSchema,
  insertTutorialProgressSchema,
  insertSecurityChallengeSchema,
  insertChallengeSolutionSchema,
  insertChallengeCommentSchema,
  insertUserChallengeProgressSchema,
  type User
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import paymentRoutes from "./payment-routes";
import { EmailService } from "./email-service";
import { McpService } from "./mcp-service";
import { 
  insertMcpServerSchema,
  insertMcpResourceSchema,
  insertMcpToolSchema,
  insertMcpContextExtractionSchema,
  insertMcpGithubPRSchema,
  insertMcpWorkflowSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to parse JSON
  app.use(express.json());

  // Create HTTP server
  const httpServer = createServer(app);

  // Mount payment routes with authentication middleware
  // Using a more specific path to avoid blocking all API routes
  app.use('/api/payments', isAuthenticated, paymentRoutes);

  // Setup email processing
  // In a real application, this would be a scheduled job or separate worker
  // Temporarily disabled due to database connection issues
  /*
  setInterval(() => {
    EmailService.processEmailQueue().catch(err => {
      console.error('Error processing email queue:', err);
    });
  }, 60000); // Process every minute
  */

  // ===== User Routes =====
  app.post('/api/users', async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
  });

  app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  // ===== Hardware Routes =====
  app.get('/api/hardware', async (_req: Request, res: Response) => {
    try {
      const hardware = await storage.getAllHardware();
      res.json(hardware);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hardware' });
    }
  });

  app.get('/api/hardware/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const hardware = await storage.getHardware(id);
      if (!hardware) {
        return res.status(404).json({ error: 'Hardware not found' });
      }
      res.json(hardware);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hardware' });
    }
  });

  app.get('/api/hardware/category/:category', async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const hardware = await storage.getHardwareByCategory(category);
      res.json(hardware);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hardware by category' });
    }
  });

  app.post('/api/hardware', async (req: Request, res: Response) => {
    try {
      const hardwareData = insertHardwareSchema.parse(req.body);
      const hardware = await storage.createHardware(hardwareData);
      res.status(201).json(hardware);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create hardware' });
      }
    }
  });

  // ===== Tutorial Routes =====
  app.get('/api/tutorials', async (_req: Request, res: Response) => {
    try {
      const tutorials = await storage.getAllTutorials();
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tutorials' });
    }
  });

  app.get('/api/tutorials/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const tutorial = await storage.getTutorial(id);
      if (!tutorial) {
        return res.status(404).json({ error: 'Tutorial not found' });
      }
      res.json(tutorial);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tutorial' });
    }
  });

  app.get('/api/tutorials/difficulty/:difficulty', async (req: Request, res: Response) => {
    try {
      const difficulty = req.params.difficulty;
      const tutorials = await storage.getTutorialsByDifficulty(difficulty);
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tutorials by difficulty' });
    }
  });

  app.get('/api/tutorials/hardware/:hardwareId', async (req: Request, res: Response) => {
    try {
      const hardwareId = parseInt(req.params.hardwareId);
      const tutorials = await storage.getTutorialsByHardware(hardwareId);
      res.json(tutorials);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tutorials by hardware' });
    }
  });

  app.post('/api/tutorials', async (req: Request, res: Response) => {
    try {
      const tutorialData = insertTutorialSchema.parse(req.body);
      const tutorial = await storage.createTutorial(tutorialData);
      res.status(201).json(tutorial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create tutorial' });
      }
    }
  });

  // ===== Tool Routes =====
  app.get('/api/tools', async (_req: Request, res: Response) => {
    try {
      const tools = await storage.getAllTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tools' });
    }
  });

  app.get('/api/tools/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const tool = await storage.getTool(id);
      if (!tool) {
        return res.status(404).json({ error: 'Tool not found' });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tool' });
    }
  });

  app.get('/api/tools/category/:category', async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const tools = await storage.getToolsByCategory(category);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tools by category' });
    }
  });

  app.get('/api/tools/hardware/:hardwareId', async (req: Request, res: Response) => {
    try {
      const hardwareId = parseInt(req.params.hardwareId);
      const tools = await storage.getToolsByHardware(hardwareId);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tools by hardware' });
    }
  });

  app.post('/api/tools', async (req: Request, res: Response) => {
    try {
      const toolData = insertToolSchema.parse(req.body);
      const tool = await storage.createTool(toolData);
      res.status(201).json(tool);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create tool' });
      }
    }
  });

  // ===== Project Routes =====
  app.get('/api/projects', async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  app.get('/api/projects/tag/:tag', async (req: Request, res: Response) => {
    try {
      const tag = req.params.tag;
      const projects = await storage.getProjectsByTag(tag);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects by tag' });
    }
  });

  app.get('/api/projects/author/:authorId', async (req: Request, res: Response) => {
    try {
      const authorId = parseInt(req.params.authorId);
      const projects = await storage.getProjectsByAuthor(authorId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects by author' });
    }
  });

  app.post('/api/projects', async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create project' });
      }
    }
  });

  app.patch('/api/projects/:id/stars', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { stars } = req.body;

      if (typeof stars !== 'number' || stars < 0) {
        return res.status(400).json({ error: 'Invalid star count' });
      }

      const project = await storage.updateProjectStars(id, stars);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project stars' });
    }
  });

  // Forum routes
  app.get('/api/forum', async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getAllForumPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch forum posts' });
    }
  });

  app.post('/api/forum', async (req: Request, res: Response) => {
    try {
      const postData = insertForumPostSchema.parse(req.body);
      const post = await storage.createForumPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create forum post' });
      }
    }
  });

  // Comments routes
  app.get('/api/tutorials/:id/comments', async (req: Request, res: Response) => {
    try {
      const tutorialId = parseInt(req.params.id);
      const comments = await storage.getTutorialComments(tutorialId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  app.post('/api/tutorials/:id/comments', async (req: Request, res: Response) => {
    try {
      const tutorialId = parseInt(req.params.id);
      const commentData = insertCommentSchema.parse({
        ...req.body,
        tutorialId
      });
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create comment' });
      }
    }
  });

  // User Profile routes
  app.get('/api/users/:id/profile', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const profile = await storage.getUserProfile(userId);
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  app.post('/api/users/:id/profile', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const profileData = insertUserProfileSchema.parse({
        ...req.body,
        userId
      });
      const profile = await storage.createUserProfile(profileData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: 'Failed to create profile' });
      }
    }
  });

  // Article routes
  app.get('/api/articles', async (_req: Request, res: Response) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      res.status(500).json({ error: 'Failed to fetch articles' });
    }
  });
  
  app.get('/api/articles/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid article ID' });
      }
      
      const article = await storage.getArticle(id);
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      
      // Increment view count
      await storage.incrementArticleViews(id);
      
      res.json(article);
    } catch (error) {
      console.error('Failed to fetch article:', error);
      res.status(500).json({ error: 'Failed to fetch article' });
    }
  });
  
  app.get('/api/articles/category/:category', async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      console.error('Failed to fetch articles by category:', error);
      res.status(500).json({ error: 'Failed to fetch articles by category' });
    }
  });
  
  app.post('/api/articles', async (req: Request, res: Response) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      console.error('Failed to create article:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create article' });
    }
  });

  // Search route
  app.get('/api/search', async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }

      const lowercaseQuery = query.toLowerCase();

      // Search in hardware
      const hardware = await storage.getAllHardware();
      const matchedHardware = hardware.filter(
        hw => hw.name.toLowerCase().includes(lowercaseQuery) || 
              hw.description.toLowerCase().includes(lowercaseQuery) ||
              hw.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );

      // Search in tutorials
      const tutorials = await storage.getAllTutorials();
      const matchedTutorials = tutorials.filter(
        tutorial => tutorial.title.toLowerCase().includes(lowercaseQuery) || 
                   tutorial.description.toLowerCase().includes(lowercaseQuery) ||
                   tutorial.content.toLowerCase().includes(lowercaseQuery)
      );

      // Search in tools
      const tools = await storage.getAllTools();
      const matchedTools = tools.filter(
        tool => tool.name.toLowerCase().includes(lowercaseQuery) || 
                tool.description.toLowerCase().includes(lowercaseQuery) ||
                tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );

      // Search in projects
      const projects = await storage.getAllProjects();
      const matchedProjects = projects.filter(
        project => project.title.toLowerCase().includes(lowercaseQuery) || 
                  project.description.toLowerCase().includes(lowercaseQuery) ||
                  project.tag.toLowerCase().includes(lowercaseQuery)
      );
      
      // Search in articles
      const articles = await storage.getAllArticles();
      const matchedArticles = articles.filter(
        article => article.title.toLowerCase().includes(lowercaseQuery) || 
                   article.description.toLowerCase().includes(lowercaseQuery) ||
                   article.content.toLowerCase().includes(lowercaseQuery) ||
                   article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );

      res.json({
        hardware: matchedHardware,
        tutorials: matchedTutorials,
        tools: matchedTools,
        projects: matchedProjects,
        articles: matchedArticles
      });
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  });

  // Achievement routes
  app.get('/api/achievements', async (_req: Request, res: Response) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  app.get('/api/achievements/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid achievement ID' });
      }
      
      const achievement = await storage.getAchievement(id);
      if (!achievement) {
        return res.status(404).json({ error: 'Achievement not found' });
      }
      
      res.json(achievement);
    } catch (error) {
      console.error('Failed to fetch achievement:', error);
      res.status(500).json({ error: 'Failed to fetch achievement' });
    }
  });

  app.get('/api/achievements/category/:category', async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const achievements = await storage.getAchievementsByCategory(category);
      res.json(achievements);
    } catch (error) {
      console.error('Failed to fetch achievements by category:', error);
      res.status(500).json({ error: 'Failed to fetch achievements by category' });
    }
  });

  app.post('/api/achievements', async (req: Request, res: Response) => {
    try {
      const achievementData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      console.error('Failed to create achievement:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create achievement' });
    }
  });

  // User Achievement routes
  app.get('/api/users/:userId/achievements', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      const userAchievements = await storage.getUserAchievements(userId);
      res.json(userAchievements);
    } catch (error) {
      console.error('Failed to fetch user achievements:', error);
      res.status(500).json({ error: 'Failed to fetch user achievements' });
    }
  });

  app.post('/api/users/:userId/achievements', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      const userAchievementData = insertUserAchievementSchema.parse({
        ...req.body,
        userId
      });
      
      const userAchievement = await storage.createUserAchievement(userAchievementData);
      res.status(201).json(userAchievement);
    } catch (error) {
      console.error('Failed to create user achievement:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create user achievement' });
    }
  });

  app.patch('/api/user-achievements/:id/progress', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user achievement ID' });
      }
      
      const { progress } = req.body;
      if (typeof progress !== 'number' || progress < 0 || progress > 100) {
        return res.status(400).json({ error: 'Invalid progress value. Must be a number between 0 and 100.' });
      }
      
      const userAchievement = await storage.updateUserAchievementProgress(id, progress);
      if (!userAchievement) {
        return res.status(404).json({ error: 'User achievement not found' });
      }
      
      res.json(userAchievement);
    } catch (error) {
      console.error('Failed to update user achievement progress:', error);
      res.status(500).json({ error: 'Failed to update user achievement progress' });
    }
  });

  app.post('/api/user-achievements/:id/complete', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user achievement ID' });
      }
      
      const userAchievement = await storage.completeUserAchievement(id);
      if (!userAchievement) {
        return res.status(404).json({ error: 'User achievement not found' });
      }
      
      res.json(userAchievement);
    } catch (error) {
      console.error('Failed to complete user achievement:', error);
      res.status(500).json({ error: 'Failed to complete user achievement' });
    }
  });

  // Tutorial Progress routes
  app.get('/api/users/:userId/tutorials/progress', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      const tutorialProgress = await storage.getUserTutorialProgress(userId);
      res.json(tutorialProgress);
    } catch (error) {
      console.error('Failed to fetch tutorial progress:', error);
      res.status(500).json({ error: 'Failed to fetch tutorial progress' });
    }
  });

  app.get('/api/users/:userId/tutorials/:tutorialId/progress', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const tutorialId = parseInt(req.params.tutorialId);
      
      if (isNaN(userId) || isNaN(tutorialId)) {
        return res.status(400).json({ error: 'Invalid user ID or tutorial ID' });
      }
      
      const progress = await storage.getTutorialProgress(userId, tutorialId);
      if (!progress) {
        return res.status(404).json({ error: 'Tutorial progress not found' });
      }
      
      res.json(progress);
    } catch (error) {
      console.error('Failed to fetch tutorial progress:', error);
      res.status(500).json({ error: 'Failed to fetch tutorial progress' });
    }
  });

  app.post('/api/users/:userId/tutorials/:tutorialId/progress', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const tutorialId = parseInt(req.params.tutorialId);
      
      if (isNaN(userId) || isNaN(tutorialId)) {
        return res.status(400).json({ error: 'Invalid user ID or tutorial ID' });
      }
      
      const { progress, notes } = req.body;
      if (typeof progress !== 'number' || progress < 0 || progress > 100) {
        return res.status(400).json({ error: 'Invalid progress value. Must be a number between 0 and 100.' });
      }
      
      // Create or update progress
      let tutorialProgress;
      const existingProgress = await storage.getTutorialProgress(userId, tutorialId);
      
      if (existingProgress) {
        tutorialProgress = await storage.updateTutorialProgress(userId, tutorialId, progress);
      } else {
        tutorialProgress = await storage.createTutorialProgress({
          userId,
          tutorialId,
          progress,
          notes: notes || null
        });
      }
      
      res.status(existingProgress ? 200 : 201).json(tutorialProgress);
    } catch (error) {
      console.error('Failed to create/update tutorial progress:', error);
      res.status(500).json({ error: 'Failed to create/update tutorial progress' });
    }
  });

  app.post('/api/users/:userId/tutorials/:tutorialId/complete', async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const tutorialId = parseInt(req.params.tutorialId);
      
      if (isNaN(userId) || isNaN(tutorialId)) {
        return res.status(400).json({ error: 'Invalid user ID or tutorial ID' });
      }
      
      const tutorialProgress = await storage.completeTutorial(userId, tutorialId);
      
      // Check if the completion unlocked any achievements
      const newAchievements = await storage.checkAndAwardAchievements(userId);
      
      res.json({
        progress: tutorialProgress,
        newAchievements: newAchievements.length > 0 ? newAchievements : null
      });
    } catch (error) {
      console.error('Failed to complete tutorial:', error);
      res.status(500).json({ error: 'Failed to complete tutorial' });
    }
  });

  // ===== Authentication Routes =====
  
  // Registration route
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      // Check if user already exists
      const { username, email, password, firstName, lastName } = req.body;
      
      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
      
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Create user with hashed password
      const userData = insertUserSchema.parse({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName
      });
      
      const user = await storage.createUser(userData);
      
      // Create default user profile
      await storage.createUserProfile({
        userId: user.id,
        expertise: 'Beginner',
        bio: null,
        skills: []
      });
      
      // Auto-login after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Login after registration failed' });
        }
        
        // Update last login time
        storage.updateUserLastLogin(user.id);
        
        return res.status(201).json({ 
          message: 'Registration successful', 
          user: { 
            id: user.id, 
            username: user.username, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin
          } 
        });
      });
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Registration failed' });
    }
  });
  
  // Login route
  app.post('/api/auth/login', (req: Request, res: Response, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: 'Authentication error' });
      }
      
      if (!user) {
        return res.status(401).json({ error: info.message || 'Invalid credentials' });
      }
      
      req.login(user, async (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ error: 'Login failed' });
        }
        
        // Update last login time
        await storage.updateUserLastLogin(user.id);
        
        return res.json({ 
          message: 'Login successful', 
          user: { 
            id: user.id, 
            username: user.username, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin
          } 
        });
      });
    })(req, res, next);
  });
  
  // Logout route
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });
  
  // Get current user
  app.get('/api/auth/me', isAuthenticated, (req: Request, res: Response) => {
    const user = req.user;
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin
    });
  });
  
  // Check authentication status
  app.get('/api/auth/status', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const user = req.user;
      return res.json({
        isAuthenticated: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin
        }
      });
    }
    res.json({ isAuthenticated: false });
  });

  // Security Challenge routes
  app.get('/api/challenges', async (req: Request, res: Response) => {
    try {
      const challenges = await storage.getAllSecurityChallenges();
      res.json(challenges);
    } catch (error) {
      console.error('Failed to fetch security challenges:', error);
      res.status(500).json({ error: 'Failed to fetch security challenges' });
    }
  });

  app.get('/api/challenges/popular', async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const challenges = await storage.getPopularSecurityChallenges(limit);
      res.json(challenges);
    } catch (error) {
      console.error('Failed to fetch popular challenges:', error);
      res.status(500).json({ error: 'Failed to fetch popular challenges' });
    }
  });

  app.get('/api/challenges/category/:category', async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const challenges = await storage.getSecurityChallengesByCategory(category);
      res.json(challenges);
    } catch (error) {
      console.error('Failed to fetch challenges by category:', error);
      res.status(500).json({ error: 'Failed to fetch challenges by category' });
    }
  });

  app.get('/api/challenges/difficulty/:difficulty', async (req: Request, res: Response) => {
    try {
      const difficulty = req.params.difficulty;
      const challenges = await storage.getSecurityChallengesByDifficulty(difficulty);
      res.json(challenges);
    } catch (error) {
      console.error('Failed to fetch challenges by difficulty:', error);
      res.status(500).json({ error: 'Failed to fetch challenges by difficulty' });
    }
  });

  app.get('/api/challenges/author/:authorId', async (req: Request, res: Response) => {
    try {
      const authorId = parseInt(req.params.authorId);
      if (isNaN(authorId)) {
        return res.status(400).json({ error: 'Invalid author ID' });
      }
      const challenges = await storage.getSecurityChallengesByAuthor(authorId);
      res.json(challenges);
    } catch (error) {
      console.error('Failed to fetch challenges by author:', error);
      res.status(500).json({ error: 'Failed to fetch challenges by author' });
    }
  });

  app.get('/api/challenges/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      const challenge = await storage.getSecurityChallenge(id);
      if (!challenge) {
        return res.status(404).json({ error: 'Security challenge not found' });
      }
      
      // Increment view count
      await storage.updateChallengeStats(id, { views: 1 });
      
      res.json(challenge);
    } catch (error) {
      console.error(`Failed to fetch challenge with ID ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch challenge' });
    }
  });

  app.post('/api/challenges', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userData = req.user as User;
      const challengeData = insertSecurityChallengeSchema.parse({
        ...req.body,
        authorId: userData.id
      });
      
      const challenge = await storage.createSecurityChallenge(challengeData);
      res.status(201).json(challenge);
    } catch (error) {
      console.error('Failed to create security challenge:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create security challenge' });
    }
  });

  app.patch('/api/challenges/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }

      const userData = req.user as User;
      const challenge = await storage.getSecurityChallenge(id);
      
      if (!challenge) {
        return res.status(404).json({ error: 'Security challenge not found' });
      }
      
      // Only the author or an admin can update the challenge
      if (challenge.authorId !== userData.id && !userData.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized to update this challenge' });
      }
      
      const challengeData = insertSecurityChallengeSchema.partial().parse(req.body);
      const updatedChallenge = await storage.updateSecurityChallenge(id, challengeData);
      
      res.json(updatedChallenge);
    } catch (error) {
      console.error('Failed to update security challenge:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to update security challenge' });
    }
  });

  app.post('/api/challenges/:id/like', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      
      const challenge = await storage.getSecurityChallenge(id);
      if (!challenge) {
        return res.status(404).json({ error: 'Security challenge not found' });
      }
      
      const updatedChallenge = await storage.updateChallengeStats(id, { likes: 1 });
      res.json(updatedChallenge);
    } catch (error) {
      console.error('Failed to like challenge:', error);
      res.status(500).json({ error: 'Failed to like challenge' });
    }
  });

  // Challenge Solutions routes
  app.get('/api/challenges/:id/solutions', async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      if (isNaN(challengeId)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      const solutions = await storage.getChallengeSolutionsByChallenge(challengeId);
      res.json(solutions);
    } catch (error) {
      console.error('Failed to fetch challenge solutions:', error);
      res.status(500).json({ error: 'Failed to fetch challenge solutions' });
    }
  });

  app.post('/api/challenges/:id/solutions', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      if (isNaN(challengeId)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      
      const userData = req.user as User;
      const solutionData = insertChallengeSolutionSchema.parse({
        ...req.body,
        challengeId,
        authorId: userData.id
      });
      
      const solution = await storage.createChallengeSolution(solutionData);
      res.status(201).json(solution);
    } catch (error) {
      console.error('Failed to create challenge solution:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create challenge solution' });
    }
  });

  // Challenge Comments routes
  app.get('/api/challenges/:id/comments', async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      if (isNaN(challengeId)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      const comments = await storage.getChallengeCommentsByChallenge(challengeId);
      res.json(comments);
    } catch (error) {
      console.error('Failed to fetch challenge comments:', error);
      res.status(500).json({ error: 'Failed to fetch challenge comments' });
    }
  });

  app.post('/api/challenges/:id/comments', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      if (isNaN(challengeId)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      
      const userData = req.user as User;
      const commentData = insertChallengeCommentSchema.parse({
        ...req.body,
        challengeId,
        authorId: userData.id
      });
      
      const comment = await storage.createChallengeComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Failed to create challenge comment:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create challenge comment' });
    }
  });

  // User Challenge Progress routes
  app.get('/api/users/:userId/challenges', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
      
      // Only allow users to access their own progress or admins to access any user's progress
      const userData = req.user as User;
      if (userData.id !== userId && !userData.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized to access this user\'s challenge progress' });
      }
      
      const progressList = await storage.getUserChallengeProgressByUser(userId);
      res.json(progressList);
    } catch (error) {
      console.error('Failed to fetch user challenge progress:', error);
      res.status(500).json({ error: 'Failed to fetch user challenge progress' });
    }
  });

  app.post('/api/challenges/:id/progress', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      if (isNaN(challengeId)) {
        return res.status(400).json({ error: 'Invalid challenge ID' });
      }
      
      const userData = req.user as User;
      
      // Check if progress already exists
      const existingProgress = await storage.getUserChallengeProgress(userData.id, challengeId);
      
      if (existingProgress) {
        const updateData = {
          status: req.body.status,
          attempts: existingProgress.attempts ? existingProgress.attempts + 1 : 1,
          notes: req.body.notes,
          completedAt: req.body.status === 'completed' ? new Date() : null,
          bookmarked: req.body.bookmarked
        };
        
        const updatedProgress = await storage.updateUserChallengeProgress(existingProgress.id, updateData);
        return res.json(updatedProgress);
      }
      
      // Create new progress
      const progressData = insertUserChallengeProgressSchema.parse({
        ...req.body,
        challengeId,
        userId: userData.id
      });
      
      const progress = await storage.createUserChallengeProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      console.error('Failed to create/update challenge progress:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create/update challenge progress' });
    }
  });

  // ===== MCP Simulator Routes =====
  
  // MCP Server routes
  app.get('/api/mcp/servers', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const servers = await McpService.getServers();
      res.json(servers);
    } catch (error) {
      console.error('Failed to fetch MCP servers:', error);
      res.status(500).json({ error: 'Failed to fetch MCP servers' });
    }
  });

  app.get('/api/mcp/servers/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid server ID' });
      }
      const server = await McpService.getServer(id);
      if (!server) {
        return res.status(404).json({ error: 'MCP server not found' });
      }
      res.json(server);
    } catch (error) {
      console.error('Failed to fetch MCP server:', error);
      res.status(500).json({ error: 'Failed to fetch MCP server' });
    }
  });

  app.post('/api/mcp/servers', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const serverData = insertMcpServerSchema.parse(req.body);
      const server = await McpService.createServer(serverData);
      res.status(201).json(server);
    } catch (error) {
      console.error('Failed to create MCP server:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create MCP server' });
    }
  });

  app.patch('/api/mcp/servers/:id/status', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid server ID' });
      }
      const { status } = req.body;
      await McpService.updateServerStatus(id, status);
      res.json({ message: 'Server status updated successfully' });
    } catch (error) {
      console.error('Failed to update server status:', error);
      res.status(500).json({ error: 'Failed to update server status' });
    }
  });

  app.delete('/api/mcp/servers/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid server ID' });
      }
      await McpService.deleteServer(id);
      res.json({ message: 'Server deleted successfully' });
    } catch (error) {
      console.error('Failed to delete server:', error);
      res.status(500).json({ error: 'Failed to delete server' });
    }
  });

  // MCP Resource routes
  app.get('/api/mcp/resources', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const serverId = req.query.serverId ? parseInt(req.query.serverId as string) : undefined;
      const resources = await McpService.getResources(serverId);
      res.json(resources);
    } catch (error) {
      console.error('Failed to fetch MCP resources:', error);
      res.status(500).json({ error: 'Failed to fetch MCP resources' });
    }
  });

  app.post('/api/mcp/resources', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const resourceData = insertMcpResourceSchema.parse(req.body);
      const resource = await McpService.createResource(resourceData);
      res.status(201).json(resource);
    } catch (error) {
      console.error('Failed to create MCP resource:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create MCP resource' });
    }
  });

  app.patch('/api/mcp/resources/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid resource ID' });
      }
      await McpService.updateResource(id, req.body);
      res.json({ message: 'Resource updated successfully' });
    } catch (error) {
      console.error('Failed to update resource:', error);
      res.status(500).json({ error: 'Failed to update resource' });
    }
  });

  app.delete('/api/mcp/resources/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid resource ID' });
      }
      await McpService.deleteResource(id);
      res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
      console.error('Failed to delete resource:', error);
      res.status(500).json({ error: 'Failed to delete resource' });
    }
  });

  // MCP Tool routes
  app.get('/api/mcp/tools', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const serverId = req.query.serverId ? parseInt(req.query.serverId as string) : undefined;
      const tools = await McpService.getTools(serverId);
      res.json(tools);
    } catch (error) {
      console.error('Failed to fetch MCP tools:', error);
      res.status(500).json({ error: 'Failed to fetch MCP tools' });
    }
  });

  app.post('/api/mcp/tools', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const toolData = insertMcpToolSchema.parse(req.body);
      const tool = await McpService.createTool(toolData);
      res.status(201).json(tool);
    } catch (error) {
      console.error('Failed to create MCP tool:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create MCP tool' });
    }
  });

  // Context extraction routes (Ghostwriter-style)
  app.post('/api/mcp/extract-context', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { projectId, fileName, filePath, content } = req.body;
      
      if (!projectId || !fileName || !filePath || !content) {
        return res.status(400).json({ error: 'Missing required fields: projectId, fileName, filePath, content' });
      }

      const extraction = await McpService.extractContext(projectId, fileName, filePath, content);
      res.status(201).json(extraction);
    } catch (error) {
      console.error('Failed to extract context:', error);
      res.status(500).json({ error: 'Failed to extract context' });
    }
  });

  app.get('/api/mcp/context-extractions', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = req.query.projectId as string;
      const extractions = await McpService.getContextExtractions(projectId);
      res.json(extractions);
    } catch (error) {
      console.error('Failed to fetch context extractions:', error);
      res.status(500).json({ error: 'Failed to fetch context extractions' });
    }
  });

  app.get('/api/mcp/context-extractions/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid extraction ID' });
      }
      const extraction = await McpService.getContextExtraction(id);
      if (!extraction) {
        return res.status(404).json({ error: 'Context extraction not found' });
      }
      res.json(extraction);
    } catch (error) {
      console.error('Failed to fetch context extraction:', error);
      res.status(500).json({ error: 'Failed to fetch context extraction' });
    }
  });

  // GitHub PR bot routes
  app.get('/api/mcp/github-prs', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const prs = await McpService.getGithubPRs();
      res.json(prs);
    } catch (error) {
      console.error('Failed to fetch GitHub PRs:', error);
      res.status(500).json({ error: 'Failed to fetch GitHub PRs' });
    }
  });

  app.post('/api/mcp/github-prs', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const prData = insertMcpGithubPRSchema.parse(req.body);
      const pr = await McpService.createGithubPR(prData);
      res.status(201).json(pr);
    } catch (error) {
      console.error('Failed to create GitHub PR:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create GitHub PR' });
    }
  });

  app.patch('/api/mcp/github-prs/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid PR ID' });
      }
      await McpService.updateGithubPR(id, req.body);
      res.json({ message: 'GitHub PR updated successfully' });
    } catch (error) {
      console.error('Failed to update GitHub PR:', error);
      res.status(500).json({ error: 'Failed to update GitHub PR' });
    }
  });

  app.post('/api/mcp/github-prs/:id/comment', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid PR ID' });
      }
      const { comment } = req.body;
      await McpService.addBotComment(id, comment);
      res.json({ message: 'Bot comment added successfully' });
    } catch (error) {
      console.error('Failed to add bot comment:', error);
      res.status(500).json({ error: 'Failed to add bot comment' });
    }
  });

  // Workflow routes
  app.get('/api/mcp/workflows', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const workflows = await McpService.getWorkflows();
      res.json(workflows);
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
      res.status(500).json({ error: 'Failed to fetch workflows' });
    }
  });

  app.post('/api/mcp/workflows', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const workflowData = insertMcpWorkflowSchema.parse(req.body);
      const workflow = await McpService.createWorkflow(workflowData);
      res.status(201).json(workflow);
    } catch (error) {
      console.error('Failed to create workflow:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).message });
      }
      res.status(500).json({ error: 'Failed to create workflow' });
    }
  });

  app.post('/api/mcp/workflows/:id/run', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid workflow ID' });
      }
      await McpService.runWorkflow(id);
      res.json({ message: 'Workflow execution started' });
    } catch (error) {
      console.error('Failed to run workflow:', error);
      res.status(500).json({ error: 'Failed to run workflow' });
    }
  });

  app.patch('/api/mcp/workflows/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid workflow ID' });
      }
      await McpService.updateWorkflow(id, req.body);
      res.json({ message: 'Workflow updated successfully' });
    } catch (error) {
      console.error('Failed to update workflow:', error);
      res.status(500).json({ error: 'Failed to update workflow' });
    }
  });

  return httpServer;
}