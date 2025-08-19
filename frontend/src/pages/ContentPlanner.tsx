import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contentItems, users, ContentItem } from "@/data/mockData";
import { 
  Plus, 
  Filter, 
  Search,
  PenTool,
  Video,
  Mail,
  Share2,
  Calendar,
  Hash,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  X
} from "lucide-react";

export default function ContentPlanner() {
  const [contentList, setContentList] = useState<ContentItem[]>(contentItems);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredContent = contentList.filter(item => {
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-success/10 text-success border-success/20';
      case 'Submitted':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Drafted':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Revisions':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'Blog Post':
        return <PenTool className="w-4 h-4" />;
      case 'Video':
        return <Video className="w-4 h-4" />;
      case 'Newsletter':
        return <Mail className="w-4 h-4" />;
      case 'Social Media':
        return <Share2 className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: ContentItem['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'Submitted':
        return <Clock className="w-4 h-4 text-primary" />;
      case 'Revisions':
        return <AlertTriangle className="w-4 h-4 text-accent" />;
      case 'Rejected':
        return <X className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const updateContentStatus = (contentId: string, newStatus: ContentItem['status']) => {
    setContentList(prev => prev.map(item => 
      item.id === contentId ? { ...item, status: newStatus } : item
    ));
  };

  // Calculate stats
  const contentStats = {
    total: contentList.length,
    approved: contentList.filter(c => c.status === 'Approved').length,
    pending: contentList.filter(c => c.status === 'Drafted' || c.status === 'Submitted').length,
    needsRevision: contentList.filter(c => c.status === 'Revisions').length,
    scheduled: contentList.filter(c => c.scheduledDate).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Planner</h1>
          <p className="text-muted-foreground">Manage content creation and publishing workflow</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Content Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contentTitle">Content Title</Label>
                <Input id="contentTitle" placeholder="Enter content title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog Post">Blog Post</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Input id="platform" placeholder="e.g., YouTube, Instagram" />
                </div>
              </div>
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="scheduledDate">Scheduled Date</Label>
                  <Input id="scheduledDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input id="hashtags" placeholder="#startup #growth #productivity" />
              </div>
              <Button className="w-full bg-gradient-primary">Create Content</Button>
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
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Content</p>
                <p className="text-xl font-bold">{contentStats.total}</p>
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
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-xl font-bold">{contentStats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold">{contentStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Revision</p>
                <p className="text-xl font-bold">{contentStats.needsRevision}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-xl font-bold">{contentStats.scheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Label>Status:</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Drafted">Drafted</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Revisions">Revisions</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Type:</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Blog Post">Blog Post</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid gap-6">
        {filteredContent.map((content) => (
          <Card key={content.id} className="shadow-card hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(content.type)}
                    </div>
                    <h3 className="font-semibold text-lg">{content.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {content.type}
                    </Badge>
                    {content.platform && (
                      <Badge variant="outline" className="text-xs bg-accent/10 text-accent">
                        {content.platform}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <div className="flex items-center gap-1">
                        {content.assignedTo.slice(0, 2).map((person, index) => (
                          <Avatar key={index} className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {person.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {content.assignedTo.length > 2 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            +{content.assignedTo.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Due: {new Date(content.dueDate).toLocaleDateString()}
                      </span>
                    </div>

                    {content.scheduledDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-accent">
                          Scheduled: {new Date(content.scheduledDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {content.hashtags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {content.hashtags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(content.status)}
                    <Badge className={getStatusColor(content.status)}>
                      {content.status}
                    </Badge>
                  </div>
                  <Select
                    value={content.status}
                    onValueChange={(value) => updateContentStatus(content.id, value as ContentItem['status'])}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Drafted">Drafted</SelectItem>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Revisions">Revisions</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  {content.status === 'Approved' && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="w-3 h-3" />
                      Export
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}