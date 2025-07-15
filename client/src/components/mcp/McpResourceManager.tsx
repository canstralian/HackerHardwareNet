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
import { Plus, FileText, Link, Edit, Trash2, Download, Eye } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface McpResourceManagerProps {
  servers: any[];
}

export function McpResourceManager({ servers }: McpResourceManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [newResource, setNewResource] = useState({
    serverId: '',
    uri: '',
    name: '',
    description: '',
    mimeType: 'text/plain',
    content: '',
    metadata: '{}'
  });
  const queryClient = useQueryClient();

  const { data: resources = [] } = useQuery({
    queryKey: ['/api/mcp/resources', selectedServerId],
    queryFn: () => apiRequest(`/api/mcp/resources${selectedServerId ? `?serverId=${selectedServerId}` : ''}`),
  });

  const createResourceMutation = useMutation({
    mutationFn: (resourceData: any) => 
      apiRequest('/api/mcp/resources', { method: 'POST', body: resourceData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/resources'] });
      setShowCreateDialog(false);
      setNewResource({
        serverId: '',
        uri: '',
        name: '',
        description: '',
        mimeType: 'text/plain',
        content: '',
        metadata: '{}'
      });
    },
  });

  const deleteResourceMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/mcp/resources/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/resources'] });
    },
  });

  const handleCreateResource = () => {
    try {
      const resourceData = {
        ...newResource,
        serverId: parseInt(newResource.serverId),
        metadata: JSON.parse(newResource.metadata)
      };
      createResourceMutation.mutate(resourceData);
    } catch (error) {
      console.error('Invalid JSON in metadata:', error);
    }
  };

  const getMimeTypeIcon = (mimeType: string) => {
    if (mimeType.startsWith('text/')) return <FileText className="h-4 w-4" />;
    if (mimeType.startsWith('application/json')) return <FileText className="h-4 w-4" />;
    return <Link className="h-4 w-4" />;
  };

  const getMimeTypeColor = (mimeType: string) => {
    if (mimeType.startsWith('text/')) return 'bg-blue-600';
    if (mimeType.startsWith('application/json')) return 'bg-green-600';
    if (mimeType.startsWith('application/')) return 'bg-purple-600';
    return 'bg-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">MCP Resources</h2>
          <p className="text-gray-400">Manage resources exposed by MCP servers</p>
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
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Resource</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serverId" className="text-gray-300">Server</Label>
                  <Select value={newResource.serverId} onValueChange={(value) => setNewResource({ ...newResource, serverId: value })}>
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
                  <Label htmlFor="uri" className="text-gray-300">URI</Label>
                  <Input
                    id="uri"
                    value={newResource.uri}
                    onChange={(e) => setNewResource({ ...newResource, uri: e.target.value })}
                    placeholder="file:///path/to/resource"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-300">Name</Label>
                  <Input
                    id="name"
                    value={newResource.name}
                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                    placeholder="Resource name"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    placeholder="Resource description..."
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="mimeType" className="text-gray-300">MIME Type</Label>
                  <Select value={newResource.mimeType} onValueChange={(value) => setNewResource({ ...newResource, mimeType: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="text/plain">text/plain</SelectItem>
                      <SelectItem value="application/json">application/json</SelectItem>
                      <SelectItem value="text/markdown">text/markdown</SelectItem>
                      <SelectItem value="application/javascript">application/javascript</SelectItem>
                      <SelectItem value="text/html">text/html</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content" className="text-gray-300">Content</Label>
                  <Textarea
                    id="content"
                    value={newResource.content}
                    onChange={(e) => setNewResource({ ...newResource, content: e.target.value })}
                    placeholder="Resource content..."
                    className="bg-gray-800 border-gray-600 text-white h-32"
                  />
                </div>
                <div>
                  <Label htmlFor="metadata" className="text-gray-300">Metadata (JSON)</Label>
                  <Textarea
                    id="metadata"
                    value={newResource.metadata}
                    onChange={(e) => setNewResource({ ...newResource, metadata: e.target.value })}
                    placeholder='{"key": "value"}'
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <Button 
                  onClick={handleCreateResource}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={createResourceMutation.isPending}
                >
                  {createResourceMutation.isPending ? 'Creating...' : 'Create Resource'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource: any) => (
          <Card key={resource.id} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  {getMimeTypeIcon(resource.mimeType)}
                  <span className="ml-2 truncate">{resource.name}</span>
                </div>
                <Badge className={`${getMimeTypeColor(resource.mimeType)} text-white text-xs`}>
                  {resource.mimeType}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">{resource.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">URI:</span>
                    <span className="text-white truncate ml-2">{resource.uri}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Server:</span>
                    <span className="text-white">
                      {servers.find(s => s.id === resource.serverId)?.name || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-white">
                      {new Date(resource.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedResource(resource);
                      setShowResourceDialog(true);
                    }}
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
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
                    onClick={() => deleteResourceMutation.mutate(resource.id)}
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

      {/* Resource View Dialog */}
      <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedResource && getMimeTypeIcon(selectedResource.mimeType)}
              <span className="ml-2">{selectedResource?.name}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedResource && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Description</Label>
                <p className="text-white">{selectedResource.description}</p>
              </div>
              <div>
                <Label className="text-gray-300">URI</Label>
                <p className="text-white font-mono text-sm">{selectedResource.uri}</p>
              </div>
              <div>
                <Label className="text-gray-300">Content</Label>
                <Textarea
                  value={selectedResource.content}
                  readOnly
                  className="bg-gray-800 border-gray-600 text-white h-64 font-mono text-sm"
                />
              </div>
              {selectedResource.metadata && (
                <div>
                  <Label className="text-gray-300">Metadata</Label>
                  <pre className="bg-gray-800 border border-gray-600 rounded p-3 text-sm text-white overflow-x-auto">
                    {JSON.stringify(selectedResource.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}