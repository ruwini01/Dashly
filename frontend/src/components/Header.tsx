import { SidebarTrigger } from "@/components/ui/sidebar";
import { users } from "@/data/mockData";
import NotificationCenter from "./NotificationCenter";
import UserProfileMenu from "./UserProfileMenu";

export function Header() {
  const currentUser = users[0]; // Alex Johnson as current user

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden md:block">
          <h1 className="font-semibold text-lg text-foreground">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationCenter />
        <UserProfileMenu />
      </div>
    </header>
  );
}