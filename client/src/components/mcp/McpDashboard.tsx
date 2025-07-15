import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Server, Workflow, GitBranch, Code, Activity, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface McpDashboardProps {
  servers: any[];
  workflows: any[];
  githubPRs: any[];
  extractions: any[];
}

export function McpDashboard({ servers, workflows, githubPRs, extractions }: McpDashboardProps) {
  const recentActivity = [
    ...servers.map(s => ({
      type: 'server',
      title: `Server ${s.name}`,
      status: s.status,
      time: s.updatedAt || s.createdAt,
      icon: Server
    })),
    ...workflows.map(w => ({
      type: 'workflow',
      title: `Workflow ${w.name}`,
      status: w.status,
      time: w.lastRun || w.createdAt,
      icon: Workflow
    })),
    ...githubPRs.map(pr => ({
      type: 'github',
      title: `PR #${pr.prNumber}`,
      status: pr.status,
      time: pr.updatedAt || pr.createdAt,
      icon: GitBranch
    })),
    ...extractions.map(e => ({
      type: 'extraction',
      title: `${e.fileName}`,
      status: 'completed',
      time: e.updatedAt || e.createdAt,
      icon: Code
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
      case 'completed':
      case 'merged':
        return 'bg-green-500';
      case 'pending':
      case 'inactive':
        return 'bg-yellow-500';
      case 'failed':
      case 'error':
      case 'closed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
      case 'completed':
      case 'merged':
        return CheckCircle;
      case 'pending':
      case 'inactive':
        return Clock;
      case 'failed':
      case 'error':
      case 'closed':
        return XCircle;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const StatusIcon = getStatusIcon(activity.status);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <activity.icon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">{activity.title}</p>
                        <p className="text-gray-400 text-sm capitalize">{activity.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(activity.status)} text-white`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {activity.status}
                      </Badge>
                      <span className="text-gray-500 text-sm">
                        {new Date(activity.time).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Server className="h-4 w-4 mr-2" />
              Add MCP Server
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Workflow className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Code className="h-4 w-4 mr-2" />
              Extract Context
            </Button>
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              size="sm"
            >
              <GitBranch className="h-4 w-4 mr-2" />
              Monitor PR
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Servers</p>
                <p className="text-2xl font-bold text-white">{servers.length}</p>
              </div>
              <Server className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {servers.filter(s => s.status === 'active').length} active
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Workflows</p>
                <p className="text-2xl font-bold text-white">{workflows.length}</p>
              </div>
              <Workflow className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {workflows.filter(w => w.status === 'running').length} running
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">GitHub PRs</p>
                <p className="text-2xl font-bold text-white">{githubPRs.length}</p>
              </div>
              <GitBranch className="h-8 w-8 text-orange-400" />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {githubPRs.filter(pr => pr.status === 'pending').length} pending
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Extractions</p>
                <p className="text-2xl font-bold text-white">{extractions.length}</p>
              </div>
              <Code className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {extractions.filter(e => e.updatedAt > new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()).length} today
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}