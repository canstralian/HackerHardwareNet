import { db } from './db';
import { 
  mcpServers, 
  mcpResources, 
  mcpTools, 
  mcpContextExtractions, 
  mcpGithubPRs, 
  mcpWorkflows,
  type McpServer,
  type McpResource,
  type McpTool,
  type McpContextExtraction,
  type McpGithubPR,
  type McpWorkflow,
  type InsertMcpServer,
  type InsertMcpResource,
  type InsertMcpTool,
  type InsertMcpContextExtraction,
  type InsertMcpGithubPR,
  type InsertMcpWorkflow
} from '../shared/schema';
import { eq, desc, sql } from 'drizzle-orm';
import crypto from 'crypto';

export class McpService {
  // Server management
  static async createServer(serverData: InsertMcpServer): Promise<McpServer> {
    const [server] = await db.insert(mcpServers).values(serverData).returning();
    return server;
  }

  static async getServers(): Promise<McpServer[]> {
    return await db.select().from(mcpServers).orderBy(desc(mcpServers.createdAt));
  }

  static async getServer(id: number): Promise<McpServer | null> {
    const [server] = await db.select().from(mcpServers).where(eq(mcpServers.id, id));
    return server || null;
  }

  static async updateServerStatus(id: number, status: string): Promise<void> {
    await db.update(mcpServers)
      .set({ status, lastPing: sql`now()`, updatedAt: sql`now()` })
      .where(eq(mcpServers.id, id));
  }

  static async deleteServer(id: number): Promise<void> {
    // Delete related resources and tools first
    await db.delete(mcpResources).where(eq(mcpResources.serverId, id));
    await db.delete(mcpTools).where(eq(mcpTools.serverId, id));
    await db.delete(mcpServers).where(eq(mcpServers.id, id));
  }

  // Resource management
  static async createResource(resourceData: InsertMcpResource): Promise<McpResource> {
    const [resource] = await db.insert(mcpResources).values(resourceData).returning();
    return resource;
  }

  static async getResources(serverId?: number): Promise<McpResource[]> {
    const query = db.select().from(mcpResources);
    if (serverId) {
      return await query.where(eq(mcpResources.serverId, serverId)).orderBy(desc(mcpResources.createdAt));
    }
    return await query.orderBy(desc(mcpResources.createdAt));
  }

  static async getResource(id: number): Promise<McpResource | null> {
    const [resource] = await db.select().from(mcpResources).where(eq(mcpResources.id, id));
    return resource || null;
  }

  static async updateResource(id: number, updates: Partial<McpResource>): Promise<void> {
    await db.update(mcpResources)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(mcpResources.id, id));
  }

  static async deleteResource(id: number): Promise<void> {
    await db.delete(mcpResources).where(eq(mcpResources.id, id));
  }

  // Tool management
  static async createTool(toolData: InsertMcpTool): Promise<McpTool> {
    const [tool] = await db.insert(mcpTools).values(toolData).returning();
    return tool;
  }

  static async getTools(serverId?: number): Promise<McpTool[]> {
    const query = db.select().from(mcpTools);
    if (serverId) {
      return await query.where(eq(mcpTools.serverId, serverId)).orderBy(desc(mcpTools.createdAt));
    }
    return await query.orderBy(desc(mcpTools.createdAt));
  }

  static async getTool(id: number): Promise<McpTool | null> {
    const [tool] = await db.select().from(mcpTools).where(eq(mcpTools.id, id));
    return tool || null;
  }

  static async updateTool(id: number, updates: Partial<McpTool>): Promise<void> {
    await db.update(mcpTools)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(mcpTools.id, id));
  }

  static async deleteTool(id: number): Promise<void> {
    await db.delete(mcpTools).where(eq(mcpTools.id, id));
  }

  // Context extraction (Ghostwriter-style)
  static async extractContext(projectId: string, fileName: string, filePath: string, content: string): Promise<McpContextExtraction> {
    const codeHash = crypto.createHash('sha256').update(content).digest('hex');
    
    // Extract context using AST parsing simulation
    const extractedContext = await this.parseCodeContext(content, fileName);
    
    const contextData: InsertMcpContextExtraction = {
      projectId,
      fileName,
      filePath,
      content,
      extractedContext,
      dependencies: extractedContext.dependencies || [],
      functionSignatures: extractedContext.functions || [],
      imports: extractedContext.imports || [],
      exports: extractedContext.exports || [],
      codeHash
    };

    // Check if context already exists for this file
    const existing = await db.select()
      .from(mcpContextExtractions)
      .where(eq(mcpContextExtractions.codeHash, codeHash))
      .limit(1);

    if (existing.length > 0) {
      // Update existing context
      await db.update(mcpContextExtractions)
        .set({ ...contextData, updatedAt: sql`now()` })
        .where(eq(mcpContextExtractions.id, existing[0].id));
      return { ...existing[0], ...contextData };
    }

    const [extraction] = await db.insert(mcpContextExtractions).values(contextData).returning();
    return extraction;
  }

  static async getContextExtractions(projectId?: string): Promise<McpContextExtraction[]> {
    const query = db.select().from(mcpContextExtractions);
    if (projectId) {
      return await query.where(eq(mcpContextExtractions.projectId, projectId)).orderBy(desc(mcpContextExtractions.updatedAt));
    }
    return await query.orderBy(desc(mcpContextExtractions.updatedAt));
  }

  static async getContextExtraction(id: number): Promise<McpContextExtraction | null> {
    const [extraction] = await db.select().from(mcpContextExtractions).where(eq(mcpContextExtractions.id, id));
    return extraction || null;
  }

  // GitHub PR bot integration
  static async createGithubPR(prData: InsertMcpGithubPR): Promise<McpGithubPR> {
    const [pr] = await db.insert(mcpGithubPRs).values(prData).returning();
    return pr;
  }

  static async getGithubPRs(): Promise<McpGithubPR[]> {
    return await db.select().from(mcpGithubPRs).orderBy(desc(mcpGithubPRs.createdAt));
  }

  static async getGithubPR(id: number): Promise<McpGithubPR | null> {
    const [pr] = await db.select().from(mcpGithubPRs).where(eq(mcpGithubPRs.id, id));
    return pr || null;
  }

  static async updateGithubPR(id: number, updates: Partial<McpGithubPR>): Promise<void> {
    await db.update(mcpGithubPRs)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(mcpGithubPRs.id, id));
  }

  static async addBotComment(id: number, comment: Record<string, any>): Promise<void> {
    const pr = await this.getGithubPR(id);
    if (!pr) throw new Error('PR not found');
    
    const botComments = pr.botComments || [];
    botComments.push(comment);
    
    await this.updateGithubPR(id, { botComments });
  }

  // Workflow management
  static async createWorkflow(workflowData: InsertMcpWorkflow): Promise<McpWorkflow> {
    const [workflow] = await db.insert(mcpWorkflows).values(workflowData).returning();
    return workflow;
  }

  static async getWorkflows(): Promise<McpWorkflow[]> {
    return await db.select().from(mcpWorkflows).orderBy(desc(mcpWorkflows.createdAt));
  }

  static async getWorkflow(id: number): Promise<McpWorkflow | null> {
    const [workflow] = await db.select().from(mcpWorkflows).where(eq(mcpWorkflows.id, id));
    return workflow || null;
  }

  static async updateWorkflow(id: number, updates: Partial<McpWorkflow>): Promise<void> {
    await db.update(mcpWorkflows)
      .set({ ...updates, updatedAt: sql`now()` })
      .where(eq(mcpWorkflows.id, id));
  }

  static async runWorkflow(id: number): Promise<void> {
    const workflow = await this.getWorkflow(id);
    if (!workflow) throw new Error('Workflow not found');

    await this.updateWorkflow(id, { 
      status: 'running', 
      lastRun: sql`now()`,
      runCount: sql`${mcpWorkflows.runCount} + 1`
    });

    try {
      // Execute workflow steps
      await this.executeWorkflowSteps(workflow.steps);
      
      await this.updateWorkflow(id, { status: 'completed' });
    } catch (error) {
      console.error('Workflow execution failed:', error);
      await this.updateWorkflow(id, { status: 'failed' });
      throw error;
    }
  }

  // Private helper methods
  private static async parseCodeContext(content: string, fileName: string): Promise<Record<string, any>> {
    // Simulate AST parsing for different file types
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const context: Record<string, any> = {
      language: this.getLanguageFromExtension(extension),
      functions: [],
      imports: [],
      exports: [],
      dependencies: [],
      classes: [],
      variables: [],
      comments: []
    };

    // Basic regex-based parsing (in a real implementation, use proper AST parsers)
    switch (extension) {
      case 'ts':
      case 'js':
        context.functions = this.extractJSFunctions(content);
        context.imports = this.extractJSImports(content);
        context.exports = this.extractJSExports(content);
        context.classes = this.extractJSClasses(content);
        break;
      case 'py':
        context.functions = this.extractPythonFunctions(content);
        context.imports = this.extractPythonImports(content);
        context.classes = this.extractPythonClasses(content);
        break;
      case 'java':
        context.functions = this.extractJavaFunctions(content);
        context.imports = this.extractJavaImports(content);
        context.classes = this.extractJavaClasses(content);
        break;
    }

    return context;
  }

  private static getLanguageFromExtension(extension?: string): string {
    const languageMap: Record<string, string> = {
      'ts': 'typescript',
      'js': 'javascript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'rs': 'rust',
      'php': 'php',
      'rb': 'ruby',
      'swift': 'swift',
      'kt': 'kotlin'
    };
    
    return languageMap[extension || ''] || 'unknown';
  }

  private static extractJSFunctions(content: string): Record<string, any>[] {
    const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)\s*=>|\([^)]*\)\s*=>\s*\{|function))/g;
    const functions: Record<string, any>[] = [];
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      const name = match[1] || match[2];
      if (name) {
        functions.push({
          name,
          type: 'function',
          line: content.substring(0, match.index).split('\n').length
        });
      }
    }

    return functions;
  }

  private static extractJSImports(content: string): string[] {
    const importRegex = /import\s+(?:.*?\s+from\s+)?['"]([^'"]+)['"]/g;
    const imports: string[] = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  private static extractJSExports(content: string): string[] {
    const exportRegex = /export\s+(?:default\s+)?(?:function\s+(\w+)|const\s+(\w+)|class\s+(\w+)|{\s*([^}]+)\s*})/g;
    const exports: string[] = [];
    let match;

    while ((match = exportRegex.exec(content)) !== null) {
      const name = match[1] || match[2] || match[3];
      if (name) {
        exports.push(name);
      } else if (match[4]) {
        // Handle named exports
        const namedExports = match[4].split(',').map(e => e.trim());
        exports.push(...namedExports);
      }
    }

    return exports;
  }

  private static extractJSClasses(content: string): Record<string, any>[] {
    const classRegex = /class\s+(\w+)(?:\s+extends\s+(\w+))?/g;
    const classes: Record<string, any>[] = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push({
        name: match[1],
        extends: match[2] || null,
        type: 'class',
        line: content.substring(0, match.index).split('\n').length
      });
    }

    return classes;
  }

  private static extractPythonFunctions(content: string): Record<string, any>[] {
    const functionRegex = /def\s+(\w+)\s*\([^)]*\):/g;
    const functions: Record<string, any>[] = [];
    let match;

    while ((match = functionRegex.exec(content)) !== null) {
      functions.push({
        name: match[1],
        type: 'function',
        line: content.substring(0, match.index).split('\n').length
      });
    }

    return functions;
  }

  private static extractPythonImports(content: string): string[] {
    const importRegex = /(?:from\s+(\S+)\s+import|import\s+(\S+))/g;
    const imports: string[] = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1] || match[2]);
    }

    return imports;
  }

  private static extractPythonClasses(content: string): Record<string, any>[] {
    const classRegex = /class\s+(\w+)(?:\(([^)]+)\))?:/g;
    const classes: Record<string, any>[] = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push({
        name: match[1],
        inherits: match[2] || null,
        type: 'class',
        line: content.substring(0, match.index).split('\n').length
      });
    }

    return classes;
  }

  private static extractJavaFunctions(content: string): Record<string, any>[] {
    const methodRegex = /(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*\([^)]*\)/g;
    const functions: Record<string, any>[] = [];
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      functions.push({
        name: match[1],
        type: 'method',
        line: content.substring(0, match.index).split('\n').length
      });
    }

    return functions;
  }

  private static extractJavaImports(content: string): string[] {
    const importRegex = /import\s+(?:static\s+)?([^;]+);/g;
    const imports: string[] = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  private static extractJavaClasses(content: string): Record<string, any>[] {
    const classRegex = /(?:public|private|protected)?\s*class\s+(\w+)(?:\s+extends\s+(\w+))?/g;
    const classes: Record<string, any>[] = [];
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      classes.push({
        name: match[1],
        extends: match[2] || null,
        type: 'class',
        line: content.substring(0, match.index).split('\n').length
      });
    }

    return classes;
  }

  private static async executeWorkflowSteps(steps: Record<string, any>[]): Promise<void> {
    for (const step of steps) {
      console.log(`Executing step: ${step.name}`);
      
      switch (step.type) {
        case 'github_pr_check':
          await this.executeGithubPRCheck(step);
          break;
        case 'context_extraction':
          await this.executeContextExtraction(step);
          break;
        case 'mcp_server_call':
          await this.executeMcpServerCall(step);
          break;
        case 'notification':
          await this.executeNotification(step);
          break;
        default:
          console.warn(`Unknown step type: ${step.type}`);
      }
    }
  }

  private static async executeGithubPRCheck(step: Record<string, any>): Promise<void> {
    // Simulate GitHub PR check
    console.log(`Checking GitHub PR for repo: ${step.repo}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private static async executeContextExtraction(step: Record<string, any>): Promise<void> {
    // Simulate context extraction
    console.log(`Extracting context for project: ${step.projectId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  private static async executeMcpServerCall(step: Record<string, any>): Promise<void> {
    // Simulate MCP server call
    console.log(`Calling MCP server: ${step.serverName}`);
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  private static async executeNotification(step: Record<string, any>): Promise<void> {
    // Simulate notification
    console.log(`Sending notification: ${step.message}`);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}