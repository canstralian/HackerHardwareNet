import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Workflow, Play, Pause, Edit, Trash2, Clock, Activity, CheckCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface McpWorkflowManagerProps {
  workflows: any[];
  onRunWorkflow: (id: number) => void;
}

export function McpWorkflowManager({ workflows, onRunWorkflow }: McpWorkflowManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showWorkflowDialog, setShowWorkflowDialog] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: 'manual',
    steps: JSON.stringify([
      {
        type: 'github_pr_check',
        name: 'Check PR Status',
        config: {
          repo: 'user/repo',
          pr_number: 123
        }
      },
      {
        type: 'context_extraction',
        name: 'Extract Context',
        config: {
          project_id: 'mcp-project',
          files: ['src/**/*.ts', 'src/**/*.tsx']
        }
      },
      {
        type: 'mcp_server_call',
        name: 'Process with MCP',
        config: {
          server_id: 1,
          tool: 'analyze_code',
          params: {}
        }
      },
      {
        type: 'notification',
        name: 'Send Notification',
        config: {
          message: 'Workflow completed successfully'
        }
      }
    ], null, 2)
  });
  const queryClient = useQueryClient();

  const createWorkflowMutation = useMutation({
    mutationFn: (workflowData: any) => 
      apiRequest('/api/mcp/workflows', { method: 'POST', body: workflowData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/workflows'] });
      setShowCreateDialog(false);
      setNewWorkflow({
        name: '',
        description: '',
        trigger: 'manual',
        steps: JSON.stringify([
          {
            type: 'github_pr_check',
            name: 'Check PR Status',
            config: {
              repo: 'user/repo',
              pr_number: 123
            }
          }
        ], null, 2)
      });
    },
  });

  const updateWorkflowMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) =>
      apiRequest(`/api/mcp/workflows/${id}`, { 
        method: 'PATCH', 
        body: updates
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/workflows'] });
    },
  });

  const handleCreateWorkflow = () => {
    try {
      const workflowData = {
        ...newWorkflow,
        steps: JSON.parse(newWorkflow.steps)
      };
      createWorkflowMutation.mutate(workflowData);
    } catch (error) {
      console.error('Invalid JSON in steps:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-400" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <Trash2 className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-600';
      case 'completed':
        return 'bg-green-600';
      case 'failed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'schedule':
        return <Clock className="h-4 w-4" />;
      case 'webhook':
        return <Activity className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">MCP Workflows</h2>
          <p className="text-gray-400">Automate MCP tasks with custom workflows</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Workflow Name</Label>
                <Input
                  id="name"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  placeholder="PR Analysis Workflow"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  placeholder="Automatically analyze GitHub PRs and extract context..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="trigger" className="text-gray-300">Trigger</Label>
                <Select value={newWorkflow.trigger} onValueChange={(value) => setNewWorkflow({ ...newWorkflow, trigger: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="github_pr">GitHub PR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="steps" className="text-gray-300">Workflow Steps (JSON)</Label>
                <Textarea
                  id="steps"
                  value={newWorkflow.steps}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, steps: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white h-64 font-mono text-sm"
                />
              </div>
              <Button 
                onClick={handleCreateWorkflow}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={createWorkflowMutation.isPending}
              >
                {createWorkflowMutation.isPending ? 'Creating...' : 'Create Workflow'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Workflow className="h-4 w-4 mr-2" />
                  <span className="truncate">{workflow.name}</span>
                </div>
                <Badge className={`${getStatusColor(workflow.status)} text-white text-xs`}>
                  {workflow.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">{workflow.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Trigger:</span>
                    <div className="flex items-center text-white">
                      {getTriggerIcon(workflow.trigger)}
                      <span className="ml-1 capitalize">{workflow.trigger}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Steps:</span>
                    <span className="text-white">{workflow.steps?.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Runs:</span>
                    <span className="text-white">{workflow.runCount || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Run:</span>
                    <span className="text-white">
                      {workflow.lastRun ? new Date(workflow.lastRun).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Next Run:</span>
                    <span className="text-white">
                      {workflow.nextRun ? new Date(workflow.nextRun).toLocaleDateString() : 'Manual'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRunWorkflow(workflow.id)}
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedWorkflow(workflow);
                      setShowWorkflowDialog(true);
                    }}
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateWorkflowMutation.mutate({ 
                      id: workflow.id, 
                      updates: { status: workflow.status === 'active' ? 'inactive' : 'active' } 
                    })}
                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    {workflow.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Details Dialog */}
      <Dialog open={showWorkflowDialog} onOpenChange={setShowWorkflowDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Workflow className="h-5 w-5 mr-2" />
              {selectedWorkflow?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Status</Label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedWorkflow.status)}
                    <Badge className={`${getStatusColor(selectedWorkflow.status)} text-white`}>
                      {selectedWorkflow.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Trigger</Label>
                  <div className="flex items-center space-x-2">
                    {getTriggerIcon(selectedWorkflow.trigger)}
                    <span className="text-white capitalize">{selectedWorkflow.trigger}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Description</Label>
                <p className="text-white">{selectedWorkflow.description}</p>
              </div>

              <div>
                <Label className="text-gray-300">Workflow Steps</Label>
                <div className="bg-gray-800 rounded p-3 space-y-2">
                  {selectedWorkflow.steps?.map((step: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400 font-mono text-sm">{index + 1}</span>
                        <span className="text-white">{step.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {step.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Execution Statistics</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-white">{selectedWorkflow.runCount || 0}</div>
                    <div className="text-sm text-gray-400">Total Runs</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {selectedWorkflow.successCount || 0}
                    </div>
                    <div className="text-sm text-gray-400">Successful</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {selectedWorkflow.failureCount || 0}
                    </div>
                    <div className="text-sm text-gray-400">Failed</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => onRunWorkflow(selectedWorkflow.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Now
                </Button>
                <Button
                  onClick={() => updateWorkflowMutation.mutate({ 
                    id: selectedWorkflow.id, 
                    updates: { status: selectedWorkflow.status === 'active' ? 'inactive' : 'active' } 
                  })}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {selectedWorkflow.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}