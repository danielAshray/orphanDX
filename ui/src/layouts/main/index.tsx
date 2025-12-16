import { Button } from "@/components/button";
import {
  Building2,
  FlaskConical,
  LogOut,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/auth";
import { ImageWithFallback } from "@/components";

const Main = () => {
  const { user, role, logout } = useAuthContext();

  const getRoleIcon = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <ShieldCheck className="w-4 h-4" />;
      case "lab":
        return <FlaskConical className="w-4 h-4" />;
      case "facility":
        return <Building2 className="w-4 h-4" />;
      case "provider":
        return <Stethoscope className="w-4 h-4" />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-200 rounded-lg flex items-center justify-center drop-shadow shadow">
                <ImageWithFallback
                  src="/logo.png"
                  alt="Logo"
                  className="w-10 h-auto object-cover"
                />
              </div>
              <div>
                <h1 className="text-gray-900">OrphanDX</h1>
                <p className="text-xs text-gray-500">
                  Specialty Test Intelligence Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
                {getRoleIcon()}
                <div>
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">
                    {user.role.toUpperCase()}
                    {/* - {user.organizationName} */}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 cursor-pointer"
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
