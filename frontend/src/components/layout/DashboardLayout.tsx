import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  CheckSquare, 
  Users, 
  FolderOpen, 
  Calendar, 
  PenTool, 
  MessageSquare,
  Grid,
  Bell,
  Calendar as CalendarIcon
} from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo and Brand */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-sm text-gray-500">Startup Planner</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <nav className="space-y-2">
            <Link to="/">
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-colors ${
                  isActive("/") 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-4 h-4" />
                Dashboard
              </button>
            </Link>
            
            <Link to="/tasks">
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-colors ${
                  isActive("/tasks") 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Tasks
              </button>
            </Link>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <Users className="w-4 h-4" />
              Leads
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <FolderOpen className="w-4 h-4" />
              Projects
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <PenTool className="w-4 h-4" />
              Content Planner
            </button>
            <Link to="/chat">
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-colors ${
                  isActive("/chat") 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Team Chat
              </button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-sm">Welcome back, Alex</span>
              </div>
              <p className="text-sm text-gray-500">Wednesday, August 13, 2025</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">2</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600">AJ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
