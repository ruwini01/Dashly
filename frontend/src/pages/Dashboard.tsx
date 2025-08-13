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

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary" className="bg-success/10 text-success">
                {taskStats.completed} Done
              </Badge>
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                {taskStats.inProgress} Active
              </Badge>
              {taskStats.overdue > 0 && (
                <Badge variant="destructive" className="bg-destructive/10 text-destructive">
                  {taskStats.overdue} Overdue
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.inProgress}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Avg Progress:</span>
              <Badge variant="secondary">{projectStats.avgProgress}%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
            <PenTool className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.total}</div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary" className="bg-success/10 text-success">
                {contentStats.approved} Approved
              </Badge>
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                {contentStats.pending} Pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
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
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted'
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.progress}% complete</span>
                  <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Calendar */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 text-xs ${
                      event.type === 'meeting' ? 'border-primary text-primary' :
                      event.type === 'deadline' ? 'border-warning text-warning' :
                      'border-accent text-accent'
                    }`}
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No upcoming events
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-primary" />
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
                <Badge variant="secondary" className="bg-success/10 text-success">
                  94%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-accent" />
              This Week's Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm">Complete website redesign</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm">Finalize investor pitch</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span className="text-sm">Launch beta testing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-success" />
              Quick Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completion Rate</span>
                <span className="font-semibold text-success">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">On-time Delivery</span>
                <span className="font-semibold text-primary">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Client Satisfaction</span>
                <Badge variant="secondary" className="bg-success/10 text-success">
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