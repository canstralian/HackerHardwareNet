import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Server, Plus, Play, Pause, Trash2, Settings, Activity, Clock } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface McpServerManagerProps {
  servers: any[];
  onStatusChange: (id: number, status: string) => void;
}

export function McpServerManager({ servers, onStatusChange }: McpServerManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newServer, setNewServer] = useState({
    name: '',
    description: '',
    url: '',
    version: '1.0.0',
    capabilities: ['resources', 'tools'],
    config: '{}'
  });
  const queryClient = useQueryClient();

  const createServerMutation = useMutation({
    mutationFn: (serverData: any) => 
      apiRequest('/api/mcp/servers', { method: 'POST', body: serverData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/servers'] });
      setShowCreateDialog(false);
      setNewServer({
        name: '',
        description: '',
        url: '',
        version: '1.0.0',
        capabilities: ['resources', 'tools'],
        config: '{}'
      });
    },
  });

  const deleteServerMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/mcp/servers/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/servers'] });
    },
  });

  const handleCreateServer = () => {
    try {
      const serverData = {
        ...newServer,
        config: JSON.parse(newServer.config)
      };
      createServerMutation.mutate(serverData);
    } catch (error) {
      console.error('Invalid JSON in config:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4 text-green-400" />;
      case 'inactive':
        return <Pause className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <Clock className="h-4 w-4 text-red-400" />;
      default:
        return <Server className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'inactive':
        return 'bg-gray-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">MCP Servers</h2>
          <p className="text-gray-400">Manage your Model Context Protocol servers</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Server
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Create New MCP Server</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  id="name"
                  value={newServer.name}
                  onChange={(e) => setNewServer({ ...newServer, name: e.target.value })}
                  placeholder="My MCP Server"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={newServer.description}
                  onChange={(e) => setNewServer({ ...newServer, description: e.target.value })}
                  placeholder="Server description..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="url" className="text-gray-300">URL</Label>
                <Input
                  id="url"
                  value={newServer.url}
                  onChange={(e) => setNewServer({ ...newServer, url: e.target.value })}
                  placeholder="http://localhost:3000"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="version" className="text-gray-300">Version</Label>
                <Input
                  id="version"
                  value={newServer.version}
                  onChange={(e) => setNewServer({ ...newServer, version: e.target.value })}
                  placeholder="1.0.0"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="config" className="text-gray-300">Configuration (JSON)</Label>
                <Textarea
                  id="config"
                  value={newServer.config}
                  onChange={(e) => setNewServer({ ...newServer, config: e.target.value })}
                  placeholder='{"apiKey": "your-api-key"}'
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button 
                onClick={handleCreateServer}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={createServerMutation.isPending}
              >
                {createServerMutation.isPending ? 'Creating...' : 'Create Server'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <Card key={server.id} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(server.status)}
                  <span className="ml-2">{server.name}</span>
                </div>
                <Badge className={`${getStatusColor(server.status)} text-white`}>
                  {server.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">{server.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">URL:</span>
                    <span className="text-white">{server.url}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Version:</span>
                    <span className="text-white">{server.version}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Ping:</span>
                    <span className="text-white">
                      {server.lastPing ? new Date(server.lastPing).toLocaleString() : 'Never'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-gray-400 text-sm">Capabilities:</span>
                  <div className="flex flex-wrap gap-2">
                    {server.capabilities?.map((cap: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {server.status === 'active' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStatusChange(server.id, 'inactive')}
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStatusChange(server.id, 'active')}
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Config
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteServerMutation.mutate(server.id)}
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
    </div>
  );
}