import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertHardwareSchema, 
  insertTutorialSchema, 
  insertToolSchema, 
  insertProjectSchema 
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to parse JSON
  app.use(express.json());

  // Create HTTP server
  const httpServer = createServer(app);

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
      
      res.json({
        hardware: matchedHardware,
        tutorials: matchedTutorials,
        tools: matchedTools,
        projects: matchedProjects
      });
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  });

  return httpServer;
}
