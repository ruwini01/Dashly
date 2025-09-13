import { ClerkProvider, SignIn, SignUp, UserButton, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Leads from "./pages/Leads";
import ContentPlanner from "./pages/ContentPlanner";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calender";

// Your Clerk Frontend API
const frontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_c3RlcmxpbmctcGlwZWZpc2gtNS5jbGVyay5hY2NvdW50cy5kZXYk";

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={frontendApi}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto p-6">
                  {/* Add Authentication Routes */}
                  <Routes>
                    <Route path="/" element={<DashboardLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/content-planner" element={<ContentPlanner />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/leads" element={<Leads />} />
                    </Route>

                    {/* Authentication Routes */}
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                  </Routes>

                  {/* Display User Button or Redirect if Not Signed In */}
                  <div>
                    <UserButton />
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
