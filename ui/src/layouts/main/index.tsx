import { Button } from "@/components/button";
import { localStorageUtil } from "@/lib/storage/localStorage";
import type { AuthUserProps } from "@/types";
import { LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";

const Main = ({ user }: { user: AuthUserProps }) => {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <p>{user.role}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => localStorageUtil.remove("token")}
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
