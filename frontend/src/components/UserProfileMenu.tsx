import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Settings,
  LogOut,
  Shield,
  Bell,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  company: string;
}

const mockUser: UserProfile = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@techstartup.com",
  role: "Founder & CEO",
  avatar: "",
  company: "TechStartup Inc.",
};

const UserProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    });
    setOpen(false);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${!darkMode ? 'Dark' : 'Light'} mode enabled`,
      description: `Switched to ${!darkMode ? 'dark' : 'light'} mode.`,
    });
  };

  const menuItems = [
    {
      icon: User,
      label: "View Profile",
      onClick: () => {
        navigate("/profile");
        setOpen(false);
      },
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => {
        navigate("/settings");
        setOpen(false);
      },
    },
    {
      icon: Bell,
      label: "Notification Preferences",
      onClick: () => {
        navigate("/settings");
        setOpen(false);
      },
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      onClick: () => {
        navigate("/settings");
        setOpen(false);
      },
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      onClick: () => {
        navigate("/help");
        setOpen(false);
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{mockUser.name}</CardTitle>
                <p className="text-sm text-muted-foreground truncate">{mockUser.email}</p>
                <p className="text-xs text-muted-foreground">{mockUser.role}</p>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p className="text-sm font-semibold">{mockUser.company}</p>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="space-y-1 px-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={item.onClick}
                >
                  <item.icon className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
              
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-3"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <Sun className="h-4 w-4 mr-3 text-muted-foreground" />
                ) : (
                  <Moon className="h-4 w-4 mr-3 text-muted-foreground" />
                )}
                <span className="text-sm">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </Button>
            </div>
            
            <Separator className="my-2" />
            
            <div className="px-2 pb-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    <span className="text-sm">Sign Out</span>
                  </Button>
                </AlertDialogTrigger>
                
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be redirected to the login page. Any unsaved changes will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleLogout}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileMenu;