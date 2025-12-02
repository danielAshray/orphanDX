import { Button } from "@/components/button";
import { ToastProvider } from "@/components/toaster";
import { Building2, LogOut, Stethoscope } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState<"provider" | "lab">("provider");

  if (!isLoggedIn) {
    // return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white">O</span>
              </div>
              <div>
                <h1 className="text-gray-900">OrphanDX</h1>
                <p className="text-xs text-gray-500">
                  Specialty Test Intelligence Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "provider" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("provider")}
                  className="gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  Provider View
                </Button>
                <Button
                  variant={viewMode === "lab" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("lab")}
                  className="gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  Lab View
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
