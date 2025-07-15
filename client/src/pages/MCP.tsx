import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Pause, Server, Code, GitBranch, Workflow, Activity, Download, Upload, Settings, Eye } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { McpServerManager } from '@/components/mcp/McpServerManager';
import { McpResourceManager } from '@/components/mcp/McpResourceManager';
import { McpToolManager } from '@/components/mcp/McpToolManager';
import { McpContextExtractor } from '@/components/mcp/McpContextExtractor';
import { McpGithubBot } from '@/components/mcp/McpGithubBot';
import { McpWorkflowManager } from '@/components/mcp/McpWorkflowManager';
import { McpDashboard } from '@/components/mcp/McpDashboard';

export default function MCP() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const queryClient = useQueryClient();

  const { data: servers = [], isLoading: serversLoading } = useQuery({
    queryKey: ['/api/mcp/servers'],
    queryFn: () => apiRequest('/api/mcp/servers'),
  });

  const { data: workflows = [], isLoading: workflowsLoading } = useQuery({
    queryKey: ['/api/mcp/workflows'],
    queryFn: () => apiRequest('/api/mcp/workflows'),
  });

  const { data: githubPRs = [], isLoading: prsLoading } = useQuery({
    queryKey: ['/api/mcp/github-prs'],
    queryFn: () => apiRequest('/api/mcp/github-prs'),
  });

  const { data: extractions = [], isLoading: extractionsLoading } = useQuery({
    queryKey: ['/api/mcp/context-extractions'],
    queryFn: () => apiRequest('/api/mcp/context-extractions'),
  });

  const runWorkflowMutation = useMutation({
    mutationFn: (workflowId: number) => 
      apiRequest(`/api/mcp/workflows/${workflowId}/run`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/workflows'] });
    },
  });

  const updateServerStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest(`/api/mcp/servers/${id}/status`, { 
        method: 'PATCH', 
        body: { status } 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/servers'] });
    },
  });

  const activeServers = servers.filter(s => s.status === 'active').length;
  const runningWorkflows = workflows.filter(w => w.status === 'running').length;
  const pendingPRs = githubPRs.filter(pr => pr.status === 'pending').length;
  const totalExtractions = extractions.length;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">MCP Simulator</h1>
              <p className="text-gray-400">Model Context Protocol development environment</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Config
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-green-500 text-green-400 hover:bg-green-500/10"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Config
              </Button>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Servers</p>
                  <p className="text-2xl font-bold text-green-400">{activeServers}</p>
                </div>
                <Server className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Running Workflows</p>
                  <p className="text-2xl font-bold text-blue-400">{runningWorkflows}</p>
                </div>
                <Workflow className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending PRs</p>
                  <p className="text-2xl font-bold text-orange-400">{pendingPRs}</p>
                </div>
                <GitBranch className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Context Extractions</p>
                  <p className="text-2xl font-bold text-purple-400">{totalExtractions}</p>
                </div>
                <Code className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 bg-gray-900 border-gray-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-500/20">
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-green-500/20">
              <Server className="h-4 w-4 mr-2" />
              Servers
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-green-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-green-500/20">
              <Code className="h-4 w-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="context" className="data-[state=active]:bg-green-500/20">
              <Eye className="h-4 w-4 mr-2" />
              Context
            </TabsTrigger>
            <TabsTrigger value="github" className="data-[state=active]:bg-green-500/20">
              <GitBranch className="h-4 w-4 mr-2" />
              GitHub
            </TabsTrigger>
            <TabsTrigger value="workflows" className="data-[state=active]:bg-green-500/20">
              <Workflow className="h-4 w-4 mr-2" />
              Workflows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <McpDashboard 
              servers={servers}
              workflows={workflows}
              githubPRs={githubPRs}
              extractions={extractions}
            />
          </TabsContent>

          <TabsContent value="servers" className="mt-6">
            <McpServerManager 
              servers={servers}
              onStatusChange={(id, status) => updateServerStatusMutation.mutate({ id, status })}
            />
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <McpResourceManager servers={servers} />
          </TabsContent>

          <TabsContent value="tools" className="mt-6">
            <McpToolManager servers={servers} />
          </TabsContent>

          <TabsContent value="context" className="mt-6">
            <McpContextExtractor extractions={extractions} />
          </TabsContent>

          <TabsContent value="github" className="mt-6">
            <McpGithubBot prs={githubPRs} />
          </TabsContent>

          <TabsContent value="workflows" className="mt-6">
            <McpWorkflowManager 
              workflows={workflows}
              onRunWorkflow={(id) => runWorkflowMutation.mutate(id)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}