import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, GitBranch, MessageSquare, ExternalLink, Eye, Bot, CheckCircle, Clock, XCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface McpGithubBotProps {
  prs: any[];
}

export function McpGithubBot({ prs }: McpGithubBotProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPRDialog, setShowPRDialog] = useState(false);
  const [selectedPR, setSelectedPR] = useState<any>(null);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newPR, setNewPR] = useState({
    prNumber: '',
    title: '',
    description: '',
    repoUrl: '',
    status: 'pending'
  });
  const queryClient = useQueryClient();

  const createPRMutation = useMutation({
    mutationFn: (prData: any) => 
      apiRequest('/api/mcp/github-prs', { method: 'POST', body: prData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/github-prs'] });
      setShowCreateDialog(false);
      setNewPR({
        prNumber: '',
        title: '',
        description: '',
        repoUrl: '',
        status: 'pending'
      });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: string }) =>
      apiRequest(`/api/mcp/github-prs/${id}/comment`, { 
        method: 'POST', 
        body: { comment: { content: comment, author: 'MCP Bot', timestamp: new Date().toISOString() } }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/github-prs'] });
      setShowCommentDialog(false);
      setNewComment('');
    },
  });

  const updatePRMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) =>
      apiRequest(`/api/mcp/github-prs/${id}`, { 
        method: 'PATCH', 
        body: updates
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/github-prs'] });
    },
  });

  const handleCreatePR = () => {
    const prData = {
      ...newPR,
      prNumber: parseInt(newPR.prNumber)
    };
    createPRMutation.mutate(prData);
  };

  const handleAddComment = () => {
    if (selectedPR && newComment.trim()) {
      addCommentMutation.mutate({ id: selectedPR.id, comment: newComment });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'merged':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <GitBranch className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'merged':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'closed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">GitHub PR Bot</h2>
          <p className="text-gray-400">Monitor and manage GitHub pull requests with MCP integration</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Monitor PR
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Monitor New Pull Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="prNumber" className="text-gray-300">PR Number</Label>
                <Input
                  id="prNumber"
                  value={newPR.prNumber}
                  onChange={(e) => setNewPR({ ...newPR, prNumber: e.target.value })}
                  placeholder="123"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="title" className="text-gray-300">Title</Label>
                <Input
                  id="title"
                  value={newPR.title}
                  onChange={(e) => setNewPR({ ...newPR, title: e.target.value })}
                  placeholder="Add MCP support to application"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={newPR.description}
                  onChange={(e) => setNewPR({ ...newPR, description: e.target.value })}
                  placeholder="This PR adds Model Context Protocol support..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="repoUrl" className="text-gray-300">Repository URL</Label>
                <Input
                  id="repoUrl"
                  value={newPR.repoUrl}
                  onChange={(e) => setNewPR({ ...newPR, repoUrl: e.target.value })}
                  placeholder="https://github.com/user/repo"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Button 
                onClick={handleCreatePR}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={createPRMutation.isPending}
              >
                {createPRMutation.isPending ? 'Adding...' : 'Start Monitoring'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prs.map((pr) => (
          <Card key={pr.id} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(pr.status)}
                  <span className="ml-2 truncate">#{pr.prNumber}</span>
                </div>
                <Badge className={`${getStatusColor(pr.status)} text-white text-xs`}>
                  {pr.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">{pr.title}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{pr.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Repository:</span>
                    <span className="text-white truncate ml-2">
                      {pr.repoUrl.split('/').slice(-2).join('/')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Bot Comments:</span>
                    <span className="text-white">
                      {pr.botComments?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">MCP Data:</span>
                    <span className="text-white">
                      {pr.mcpData ? 'Available' : 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-white">
                      {new Date(pr.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedPR(pr);
                      setShowPRDialog(true);
                    }}
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedPR(pr);
                      setShowCommentDialog(true);
                    }}
                    className="border-green-500 text-green-400 hover:bg-green-500/10"
                  >
                    <Bot className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(pr.repoUrl, '_blank')}
                    className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PR Details Dialog */}
      <Dialog open={showPRDialog} onOpenChange={setShowPRDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <GitBranch className="h-5 w-5 mr-2" />
              PR #{selectedPR?.prNumber}: {selectedPR?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedPR && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Status</Label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedPR.status)}
                    <Badge className={`${getStatusColor(selectedPR.status)} text-white`}>
                      {selectedPR.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Repository</Label>
                  <a 
                    href={selectedPR.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center"
                  >
                    {selectedPR.repoUrl.split('/').slice(-2).join('/')}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Description</Label>
                <p className="text-white">{selectedPR.description}</p>
              </div>

              {selectedPR.mcpData && (
                <div>
                  <Label className="text-gray-300">MCP Data</Label>
                  <pre className="bg-gray-800 border border-gray-600 rounded p-3 text-sm text-white overflow-x-auto max-h-32">
                    {JSON.stringify(selectedPR.mcpData, null, 2)}
                  </pre>
                </div>
              )}

              {selectedPR.extractedContext && (
                <div>
                  <Label className="text-gray-300">Extracted Context</Label>
                  <pre className="bg-gray-800 border border-gray-600 rounded p-3 text-sm text-white overflow-x-auto max-h-32">
                    {JSON.stringify(selectedPR.extractedContext, null, 2)}
                  </pre>
                </div>
              )}

              <div>
                <Label className="text-gray-300">Bot Comments ({selectedPR.botComments?.length || 0})</Label>
                <div className="bg-gray-800 rounded p-3 max-h-48 overflow-y-auto">
                  {selectedPR.botComments?.map((comment: any, index: number) => (
                    <div key={index} className="mb-3 p-2 bg-gray-700 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-green-400 text-sm font-medium">{comment.author}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-white text-sm">{comment.content}</p>
                    </div>
                  )) || <div className="text-gray-500 text-sm">No bot comments yet</div>}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => updatePRMutation.mutate({ 
                    id: selectedPR.id, 
                    updates: { status: selectedPR.status === 'pending' ? 'merged' : 'pending' } 
                  })}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {selectedPR.status === 'pending' ? 'Mark as Merged' : 'Mark as Pending'}
                </Button>
                <Button
                  onClick={() => {
                    setShowCommentDialog(true);
                    setShowPRDialog(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Add Bot Comment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Comment Dialog */}
      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Add Bot Comment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Comment</Label>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="This PR looks good! The MCP integration follows best practices..."
                className="bg-gray-800 border-gray-600 text-white h-32"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || addCommentMutation.isPending}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {addCommentMutation.isPending ? 'Adding...' : 'Add Comment'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCommentDialog(false)}
                className="border-gray-600 text-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}