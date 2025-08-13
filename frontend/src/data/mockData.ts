export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  timeSpent: number; // in hours
  project?: string;
}

export interface Lead {
  id: string;
  companyName: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  status: 'New' | 'Waiting for Response' | 'In Discussion' | 'Not Interested' | 'Follow-up Required';
  contactPerson: string;
  notes: string;
  lastContact: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'In Progress' | 'On Hold' | 'Completed';
  startDate: string;
  deadline: string;
  deliverables: Deliverable[];
  teamMembers: string[];
  progress: number; // percentage
}

export interface Deliverable {
  id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Needs Revision';
  dueDate: string;
  revisionCount: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'meeting' | 'deadline' | 'event';
  date: string;
  time: string;
  description: string;
  attendees?: string[];
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'Blog Post' | 'Social Media' | 'Video' | 'Newsletter';
  status: 'Drafted' | 'Submitted' | 'Approved' | 'Revisions' | 'Rejected';
  assignedTo: string[];
  dueDate: string;
  hashtags: string[];
  platform?: string;
  scheduledDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

// Mock Data
export const users: User[] = [
  { id: '1', name: 'Alex Johnson', role: 'CEO', avatar: 'AJ', email: 'alex@startup.com' },
  { id: '2', name: 'Sarah Chen', role: 'CTO', avatar: 'SC', email: 'sarah@startup.com' },
  { id: '3', name: 'Mike Davis', role: 'Designer', avatar: 'MD', email: 'mike@startup.com' },
  { id: '4', name: 'Emma Wilson', role: 'Marketing', avatar: 'EW', email: 'emma@startup.com' },
  { id: '5', name: 'James Brown', role: 'Developer', avatar: 'JB', email: 'james@startup.com' },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new product landing page',
    assignee: 'Mike Davis',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-08-15',
    timeSpent: 8.5,
    project: 'Website Redesign'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up JWT authentication system with login/register functionality',
    assignee: 'James Brown',
    status: 'Completed',
    priority: 'High',
    dueDate: '2024-08-10',
    timeSpent: 12.0
  },
  {
    id: '3',
    title: 'Content strategy planning',
    description: 'Develop Q4 content calendar and social media strategy',
    assignee: 'Emma Wilson',
    status: 'Not Started',
    priority: 'Medium',
    dueDate: '2024-08-20',
    timeSpent: 0
  },
  {
    id: '4',
    title: 'Database optimization',
    description: 'Improve query performance and add proper indexing',
    assignee: 'Sarah Chen',
    status: 'On Hold',
    priority: 'Medium',
    dueDate: '2024-08-25',
    timeSpent: 4.0
  }
];

export const leads: Lead[] = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    website: 'www.techcorp.com',
    status: 'In Discussion',
    contactPerson: 'John Smith',
    notes: 'Interested in enterprise package. Follow up next week.',
    lastContact: '2024-07-28'
  },
  {
    id: '2',
    companyName: 'InnovateLab',
    location: 'Austin, TX',
    email: 'hello@innovatelab.io',
    phone: '+1 (555) 987-6543',
    website: 'www.innovatelab.io',
    status: 'Waiting for Response',
    contactPerson: 'Lisa Johnson',
    notes: 'Sent proposal on Monday. Awaiting feedback.',
    lastContact: '2024-07-25'
  },
  {
    id: '3',
    companyName: 'StartupX',
    location: 'New York, NY',
    email: 'team@startupx.com',
    phone: '+1 (555) 456-7890',
    website: 'www.startupx.com',
    status: 'New',
    contactPerson: 'Michael Chen',
    notes: 'Initial contact through LinkedIn',
    lastContact: '2024-08-01'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with new branding',
    status: 'In Progress',
    startDate: '2024-07-01',
    deadline: '2024-09-15',
    teamMembers: ['Mike Davis', 'James Brown', 'Emma Wilson'],
    progress: 65,
    deliverables: [
      { id: '1', name: 'Wireframes', status: 'Completed', dueDate: '2024-07-15', revisionCount: 2 },
      { id: '2', name: 'Visual Design', status: 'In Progress', dueDate: '2024-08-01', revisionCount: 1 },
      { id: '3', name: 'Frontend Development', status: 'Pending', dueDate: '2024-08-30', revisionCount: 0 }
    ]
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    description: 'Develop minimum viable product for mobile application',
    status: 'In Progress',
    startDate: '2024-06-15',
    deadline: '2024-10-01',
    teamMembers: ['Sarah Chen', 'James Brown'],
    progress: 40,
    deliverables: [
      { id: '4', name: 'User Research', status: 'Completed', dueDate: '2024-07-01', revisionCount: 0 },
      { id: '5', name: 'App Architecture', status: 'Completed', dueDate: '2024-07-20', revisionCount: 1 },
      { id: '6', name: 'Core Features', status: 'In Progress', dueDate: '2024-09-15', revisionCount: 0 }
    ]
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    type: 'meeting',
    date: '2024-08-05',
    time: '09:00',
    description: 'Weekly progress review and planning',
    attendees: ['Alex Johnson', 'Sarah Chen', 'Mike Davis', 'Emma Wilson', 'James Brown']
  },
  {
    id: '2',
    title: 'Website Redesign Review',
    type: 'deadline',
    date: '2024-08-15',
    time: '14:00',
    description: 'Final review of new website design',
    attendees: ['Mike Davis', 'Alex Johnson']
  },
  {
    id: '3',
    title: 'Investor Pitch Presentation',
    type: 'event',
    date: '2024-08-20',
    time: '16:00',
    description: 'Series A funding presentation',
    attendees: ['Alex Johnson', 'Sarah Chen']
  }
];

export const contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'How to Scale Your Startup in 2024',
    type: 'Blog Post',
    status: 'Approved',
    assignedTo: ['Emma Wilson'],
    dueDate: '2024-08-10',
    hashtags: ['#startup', '#scaling', '#growth'],
    scheduledDate: '2024-08-12'
  },
  {
    id: '2',
    title: 'Product Demo Video',
    type: 'Video',
    status: 'Submitted',
    assignedTo: ['Mike Davis', 'Emma Wilson'],
    dueDate: '2024-08-20',
    hashtags: ['#product', '#demo', '#features'],
    platform: 'YouTube'
  },
  {
    id: '3',
    title: 'Weekly Newsletter',
    type: 'Newsletter',
    status: 'Drafted',
    assignedTo: ['Emma Wilson'],
    dueDate: '2024-08-08',
    hashtags: ['#newsletter', '#updates'],
    scheduledDate: '2024-08-09'
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Alex Johnson',
    message: 'Great progress on the website redesign everyone! 🚀',
    timestamp: '2024-08-01T10:30:00Z',
    avatar: 'AJ'
  },
  {
    id: '2',
    sender: 'Mike Davis',
    message: 'Thanks! Just finished the new homepage mockup. Will share soon.',
    timestamp: '2024-08-01T10:32:00Z',
    avatar: 'MD'
  },
  {
    id: '3',
    sender: 'Sarah Chen',
    message: 'The API performance improvements are ready for testing.',
    timestamp: '2024-08-01T11:15:00Z',
    avatar: 'SC'
  },
  {
    id: '4',
    sender: 'Emma Wilson',
    message: 'New blog post is live! Check out the engagement metrics.',
    timestamp: '2024-08-01T14:20:00Z',
    avatar: 'EW'
  }
];