import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Code, FileText, Search, Eye, Download, Upload } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface McpContextExtractorProps {
  extractions: any[];
}

export function McpContextExtractor({ extractions }: McpContextExtractorProps) {
  const [showExtractDialog, setShowExtractDialog] = useState(false);
  const [showContextDialog, setShowContextDialog] = useState(false);
  const [selectedExtraction, setSelectedExtraction] = useState<any>(null);
  const [newExtraction, setNewExtraction] = useState({
    projectId: '',
    fileName: '',
    filePath: '',
    content: ''
  });
  const queryClient = useQueryClient();

  const extractContextMutation = useMutation({
    mutationFn: (extractionData: any) => 
      apiRequest('/api/mcp/extract-context', { method: 'POST', body: extractionData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mcp/context-extractions'] });
      setShowExtractDialog(false);
      setNewExtraction({
        projectId: '',
        fileName: '',
        filePath: '',
        content: ''
      });
    },
  });

  const handleExtractContext = () => {
    extractContextMutation.mutate(newExtraction);
  };

  const getLanguageFromFileName = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'JavaScript';
      case 'ts':
      case 'tsx':
        return 'TypeScript';
      case 'py':
        return 'Python';
      case 'java':
        return 'Java';
      case 'cpp':
      case 'cc':
        return 'C++';
      case 'c':
        return 'C';
      case 'go':
        return 'Go';
      case 'rs':
        return 'Rust';
      case 'php':
        return 'PHP';
      case 'rb':
        return 'Ruby';
      default:
        return 'Unknown';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'JavaScript':
        return 'bg-yellow-600';
      case 'TypeScript':
        return 'bg-blue-600';
      case 'Python':
        return 'bg-green-600';
      case 'Java':
        return 'bg-orange-600';
      case 'C++':
      case 'C':
        return 'bg-blue-800';
      case 'Go':
        return 'bg-cyan-600';
      case 'Rust':
        return 'bg-orange-800';
      case 'PHP':
        return 'bg-purple-600';
      case 'Ruby':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const sampleCode = `import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function SampleComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <Card>
      <CardContent>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </CardContent>
    </Card>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Context Extraction</h2>
          <p className="text-gray-400">Extract context from code files for MCP analysis</p>
        </div>
        <Dialog open={showExtractDialog} onOpenChange={setShowExtractDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Extract Context
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Extract Code Context</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectId" className="text-gray-300">Project ID</Label>
                <Input
                  id="projectId"
                  value={newExtraction.projectId}
                  onChange={(e) => setNewExtraction({ ...newExtraction, projectId: e.target.value })}
                  placeholder="hackerhardware-mcp"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="fileName" className="text-gray-300">File Name</Label>
                <Input
                  id="fileName"
                  value={newExtraction.fileName}
                  onChange={(e) => setNewExtraction({ ...newExtraction, fileName: e.target.value })}
                  placeholder="SampleComponent.tsx"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="filePath" className="text-gray-300">File Path</Label>
                <Input
                  id="filePath"
                  value={newExtraction.filePath}
                  onChange={(e) => setNewExtraction({ ...newExtraction, filePath: e.target.value })}
                  placeholder="/src/components/SampleComponent.tsx"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="content" className="text-gray-300">File Content</Label>
                <Textarea
                  id="content"
                  value={newExtraction.content}
                  onChange={(e) => setNewExtraction({ ...newExtraction, content: e.target.value })}
                  placeholder={sampleCode}
                  className="bg-gray-800 border-gray-600 text-white h-64 font-mono text-sm"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleExtractContext}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={extractContextMutation.isPending}
                >
                  {extractContextMutation.isPending ? 'Extracting...' : 'Extract Context'}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-400"
                  onClick={() => setNewExtraction({ ...newExtraction, content: sampleCode })}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extractions.map((extraction) => {
          const language = getLanguageFromFileName(extraction.fileName);
          return (
            <Card key={extraction.id} className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="truncate">{extraction.fileName}</span>
                  </div>
                  <Badge className={`${getLanguageColor(language)} text-white text-xs`}>
                    {language}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Project:</span>
                      <span className="text-white">{extraction.projectId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Path:</span>
                      <span className="text-white truncate ml-2">{extraction.filePath}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Functions:</span>
                      <span className="text-white">
                        {extraction.extractedContext?.functions?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Imports:</span>
                      <span className="text-white">
                        {extraction.extractedContext?.imports?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Exported:</span>
                      <span className="text-white">
                        {extraction.extractedContext?.exports?.length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedExtraction(extraction);
                        setShowContextDialog(true);
                      }}
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-400 hover:bg-green-500/10"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Context View Dialog */}
      <Dialog open={showContextDialog} onOpenChange={setShowContextDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Context Analysis: {selectedExtraction?.fileName}
            </DialogTitle>
          </DialogHeader>
          {selectedExtraction && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Project Information</Label>
                  <div className="bg-gray-800 rounded p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Project ID:</span>
                      <span className="text-white">{selectedExtraction.projectId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">File Path:</span>
                      <span className="text-white font-mono">{selectedExtraction.filePath}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Language:</span>
                      <span className="text-white">{getLanguageFromFileName(selectedExtraction.fileName)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Hash:</span>
                      <span className="text-white font-mono text-xs">{selectedExtraction.codeHash}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Extraction Stats</Label>
                  <div className="bg-gray-800 rounded p-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Functions:</span>
                      <span className="text-white">{selectedExtraction.extractedContext?.functions?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Classes:</span>
                      <span className="text-white">{selectedExtraction.extractedContext?.classes?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Imports:</span>
                      <span className="text-white">{selectedExtraction.extractedContext?.imports?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Exports:</span>
                      <span className="text-white">{selectedExtraction.extractedContext?.exports?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Functions</Label>
                  <div className="bg-gray-800 rounded p-3 max-h-48 overflow-y-auto">
                    {selectedExtraction.extractedContext?.functions?.map((func: any, index: number) => (
                      <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
                        <div className="text-green-400 font-mono text-sm">{func.name}</div>
                        <div className="text-gray-400 text-xs">{func.params?.join(', ')}</div>
                      </div>
                    )) || <div className="text-gray-500 text-sm">No functions found</div>}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Imports</Label>
                  <div className="bg-gray-800 rounded p-3 max-h-48 overflow-y-auto">
                    {selectedExtraction.extractedContext?.imports?.map((imp: string, index: number) => (
                      <div key={index} className="mb-1 p-1 bg-gray-700 rounded text-sm font-mono text-blue-400">
                        {imp}
                      </div>
                    )) || <div className="text-gray-500 text-sm">No imports found</div>}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Extracted Context</Label>
                <pre className="bg-gray-800 border border-gray-600 rounded p-3 text-sm text-white overflow-x-auto max-h-64 overflow-y-auto">
                  {JSON.stringify(selectedExtraction.extractedContext, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}