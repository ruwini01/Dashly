import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { projects, users, Project, Deliverable } from "@/data/mockData";
import { 
  Plus, 
  Calendar,
  Users as UsersIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  Pause,
  Play,
  Target
} from "lucide-react";

export default function Projects() {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'On Hold':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Completed':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDeliverableStatusColor = (status: Deliverable['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/10 text-success';
      case 'In Progress':
        return 'bg-primary/10 text-primary';
      case 'Needs Revision':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'In Progress':
        return <Play className="w-4 h-4 text-primary" />;
      case 'On Hold':
        return <Pause className="w-4 h-4 text-warning" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const updateProjectStatus = (projectId: string, newStatus: Project['status']) => {
    setProjectsList(prev => prev.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
  };

  // Calculate stats
  const projectStats = {
    total: projectsList.length,
    inProgress: projectsList.filter(p => p.status === 'In Progress').length,
    onHold: projectsList.filter(p => p.status === 'On Hold').length,
    completed: projectsList.filter(p => p.status === 'Completed').length,
    avgProgress: Math.round(projectsList.reduce((acc, p) => acc + p.progress, 0) / projectsList.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage project deliverables and deadlines</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-cta text-white shadow-elegant hover:shadow-glow transition-all">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" placeholder="Enter project name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Project description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="teamMembers">Team Members</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-gradient-cta text-white shadow-elegant">Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-xl font-bold">{projectStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold">{projectStats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Pause className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Hold</p>
                <p className="text-xl font-bold">{projectStats.onHold}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-bold">{projectStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-xl font-bold">{projectStats.avgProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projectsList.map((project) => {
          const daysLeft = getDaysUntilDeadline(project.deadline);
          const isOverdue = daysLeft < 0 && project.status !== 'Completed';
          
          return (
            <Card key={project.id} className={`shadow-card transition-all hover:shadow-lg ${
              isOverdue ? 'border-l-4 border-l-destructive' : ''
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(project.status)}
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      {isOverdue && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Overdue
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <Select
                    value={project.status}
                    onValueChange={(value) => updateProjectStatus(project.id, value as Project['status'])}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Project Progress</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Start Date</p>
                      <p className="text-sm font-medium">
                        {new Date(project.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm font-medium">
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                      <p className={`text-xs ${daysLeft < 0 ? 'text-destructive' : daysLeft <= 7 ? 'text-warning' : 'text-muted-foreground'}`}>
                        {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : 
                         daysLeft === 0 ? 'Due today' : 
                         `${daysLeft} days left`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Team</p>
                      <div className="flex items-center gap-1 mt-1">
                        {project.teamMembers.slice(0, 3).map((member, index) => (
                          <Avatar key={index} className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {member.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            +{project.teamMembers.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Deliverables ({project.deliverables.length})
                  </h4>
                  <div className="space-y-2">
                    {project.deliverables.map((deliverable) => (
                      <div key={deliverable.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{deliverable.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              Due: {new Date(deliverable.dueDate).toLocaleDateString()}
                            </p>
                            {deliverable.revisionCount > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {deliverable.revisionCount} revision{deliverable.revisionCount > 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className={getDeliverableStatusColor(deliverable.status)}>
                          {deliverable.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}