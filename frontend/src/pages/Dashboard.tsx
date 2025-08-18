import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { tasks, projects, contentItems, calendarEvents } from "@/data/mockData";
import { 
  CheckSquare, 
  FolderOpen, 
  PenTool, 
  Calendar,
  TrendingUp,
  Clock,
  Users,
  Target
} from "lucide-react";

export default function Dashboard() {
  // Calculate statistics
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length
  };

  const projectStats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    onHold: projects.filter(p => p.status === 'On Hold').length,
    avgProgress: Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
  };

  const contentStats = {
    total: contentItems.length,
    approved: contentItems.filter(c => c.status === 'Approved').length,
    pending: contentItems.filter(c => c.status === 'Drafted' || c.status === 'Submitted').length,
    needsRevision: contentItems.filter(c => c.status === 'Revisions').length
  };

  const upcomingEvents = calendarEvents
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get current date
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex</h1>
        <p className="text-lg text-gray-600">{formattedDate}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
            <div className="flex items-center gap-2 text-xs mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {taskStats.completed} Done
              </Badge>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                {taskStats.inProgress} Active
              </Badge>
              {taskStats.overdue > 0 && (
                <Badge variant="destructive" className="bg-red-100 text-red-700">
                  {taskStats.overdue} Overdue
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.inProgress}</div>
            <div className="flex items-center gap-2 text-xs mt-2">
              <span className="text-gray-600">Avg Progress:</span>
              <Badge variant="secondary">{projectStats.avgProgress}%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
            <PenTool className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.total}</div>
            <div className="flex items-center gap-2 text-xs mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {contentStats.approved} Approved
              </Badge>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                {contentStats.pending} Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-gray-600 mt-2">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{project.name}</span>
                  <Badge 
                    variant={project.status === 'In Progress' ? 'default' : 'secondary'}
                    className={
                      project.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{project.progress}% complete</span>
                  <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 text-xs ${
                      event.type === 'meeting' ? 'border-blue-500 text-blue-700' :
                      event.type === 'deadline' ? 'border-orange-500 text-orange-700' :
                      'border-purple-500 text-purple-700'
                    }`}
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">
                No upcoming events
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-blue-600" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Team Members</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Hours This Week</span>
                <span className="font-semibold">187h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Productivity</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  94%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-purple-600" />
              This Week's Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">Complete website redesign</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-sm">Finalize investor pitch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm">Launch beta testing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Quick Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completion Rate</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">On-time Delivery</span>
                <span className="font-semibold text-blue-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Client Satisfaction</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  4.9/5
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}