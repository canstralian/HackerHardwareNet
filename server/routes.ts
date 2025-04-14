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
  insertTutorialProgressSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import paymentRoutes from "./payment-routes";
import { EmailService } from "./email-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to parse JSON
  app.use(express.json());

  // Create HTTP server
  const httpServer = createServer(app);

  // Mount payment routes with authentication middleware
  app.use('/api', isAuthenticated, paymentRoutes);

  // Setup email processing
  // In a real application, this would be a scheduled job or separate worker
  setInterval(() => {
    EmailService.processEmailQueue().catch(err => {
      console.error('Error processing email queue:', err);
    });
  }, 60000); // Process every minute

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

  return httpServer;
}