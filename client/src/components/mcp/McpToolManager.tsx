import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Code, Wrench, Play, Edit, Trash2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface McpToolManagerProps {
  servers: any[];
}

export function McpToolManager({ servers }: McpToolManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [showToolDialog, setShowToolDialog] = useState(false);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [newTool, setNewTool] = useState({
    serverId: '',
    name: '',
    description: '',
    schema: JSON.stringify({
      type: 'object',
      properties: {
        param1: { type: 'string', description: 'First parameter' }
      },
      required: ['param1']
    }, null, 2),
    examples: JSON.stringify([{
      name: 'Example usage',
      params: { param1: 'example value' }
    }], null, 2)
  });
  const queryClient = useQueryClient();

  const { data: tools = [] } = useQuery({
    queryKey: ['/api/mcp/tools', selectedServerId],
    queryFn: () => apiRequest(`/api/mcp/tools${selectedServerId ? `?serverId=${selectedServerId}` : ''}`),
  });

  const createToolMutation = useMutation({
    mutationFn: (toolData: any) => 
      apiRequest('/api/mcp/tools', { method: 'POST', body: toolData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/tools'] });
      setShowCreateDialog(false);
      setNewTool({
        serverId: '',
        name: '',
        description: '',
        schema: JSON.stringify({
          type: 'object',
          properties: {
            param1: { type: 'string', description: 'First parameter' }
          },
          required: ['param1']
        }, null, 2),
        examples: JSON.stringify([{
          name: 'Example usage',
          params: { param1: 'example value' }
        }], null, 2)
      });
    },
  });

  const deleteToolMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/mcp/tools/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/tools'] });
    },
  });

  const handleCreateTool = () => {
    try {
      const toolData = {
        ...newTool,
        serverId: parseInt(newTool.serverId),
        schema: JSON.parse(newTool.schema),
        examples: JSON.parse(newTool.examples)
      };
      createToolMutation.mutate(toolData);
    } catch (error) {
      console.error('Invalid JSON in schema or examples:', error);
    }
  };

  const getToolIcon = (tool: any) => {
    if (tool.name.includes('file') || tool.name.includes('read')) return <Code className="h-4 w-4" />;
    if (tool.name.includes('execute') || tool.name.includes('run')) return <Play className="h-4 w-4" />;
    return <Wrench className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">MCP Tools</h2>
          <p className="text-gray-400">Manage tools available through MCP servers</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedServerId?.toString() || ''} onValueChange={(value) => setSelectedServerId(value ? parseInt(value) : null)}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Filter by server" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="">All Servers</SelectItem>
              {servers.map((server) => (
                <SelectItem key={server.id} value={server.id.toString()}>
                  {server.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Tool</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serverId" className="text-gray-300">Server</Label>
                  <Select value={newTool.serverId} onValueChange={(value) => setNewTool({ ...newTool, serverId: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select a server" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {servers.map((server) => (
                        <SelectItem key={server.id} value={server.id.toString()}>
                          {server.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-300">Tool Name</Label>
                  <Input
                    id="name"
                    value={newTool.name}
                    onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                    placeholder="my_tool"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    value={newTool.description}
                    onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                    placeholder="Tool description..."
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="schema" className="text-gray-300">JSON Schema</Label>
                  <Textarea
                    id="schema"
                    value={newTool.schema}
                    onChange={(e) => setNewTool({ ...newTool, schema: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white h-48 font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="examples" className="text-gray-300">Examples</Label>
                  <Textarea
                    id="examples"
                    value={newTool.examples}
                    onChange={(e) => setNewTool({ ...newTool, examples: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white h-32 font-mono text-sm"
                  />
                </div>
                <Button 
                  onClick={handleCreateTool}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={createToolMutation.isPending}
                >
                  {createToolMutation.isPending ? 'Creating...' : 'Create Tool'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool: any) => (
          <Card key={tool.id} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  {getToolIcon(tool)}
                  <span className="ml-2 truncate">{tool.name}</span>
                </div>
                <Badge className="bg-blue-600 text-white text-xs">
                  Tool
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">{tool.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Server:</span>
                    <span className="text-white">
                      {servers.find(s => s.id === tool.serverId)?.name || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Parameters:</span>
                    <span className="text-white">
                      {tool.schema?.properties ? Object.keys(tool.schema.properties).length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Examples:</span>
                    <span className="text-white">
                      {tool.examples?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedTool(tool);
                      setShowToolDialog(true);
                    }}
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteToolMutation.mutate(tool.id)}
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Test Dialog */}
      <Dialog open={showToolDialog} onOpenChange={setShowToolDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedTool && getToolIcon(selectedTool)}
              <span className="ml-2">{selectedTool?.name}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedTool && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Description</Label>
                <p className="text-white">{selectedTool.description}</p>
              </div>
              <div>
                <Label className="text-gray-300">Schema</Label>
                <pre className="bg-gray-800 border border-gray-600 rounded p-3 text-sm text-white overflow-x-auto">
                  {JSON.stringify(selectedTool.schema, null, 2)}
                </pre>
              </div>
              {selectedTool.examples && selectedTool.examples.length > 0 && (
                <div>
                  <Label className="text-gray-300">Examples</Label>
                  <div className="space-y-2">
                    {selectedTool.examples.map((example: any, index: number) => (
                      <div key={index} className="bg-gray-800 border border-gray-600 rounded p-3">
                        <p className="text-white font-medium text-sm">{example.name}</p>
                        <pre className="text-green-400 text-xs mt-1">
                          {JSON.stringify(example.params, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  Execute Tool
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-400">
                  Copy Schema
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}