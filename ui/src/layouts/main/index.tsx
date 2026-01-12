import { Button } from "@/components/button";
import {
  Building2,
  FlaskConical,
  KeyRound,
  LogOut,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/auth";
import { ImageWithFallback } from "@/components";
import { useState } from "react";
import ChangePasswordDialog from "./ChangePassword Dialog";

const Main = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { orgRole, role, user, logout } = useAuthContext();

  const { name, organization } = user;

  const getRoleIcon = () => {
    switch (orgRole?.toLowerCase()) {
      case "service_account":
        return <ShieldCheck className="w-4 h-4" />;
      case "lab":
        return <FlaskConical className="w-4 h-4" />;
      case "facility":
        switch (role?.toLowerCase()) {
          case "user":
            return <Stethoscope className="w-4 h-4" />;
          default:
            return <Building2 className="w-4 h-4" />;
        }
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
            <div className="flex flex-col items-center justify-center">
              <ImageWithFallback
                src="/logo.png"
                alt="Logo"
                className="w-auto h-10 object-cover"
              />

              <p className="text-xs text-gray-500">
                Specialty Test Intelligence Platform
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
                {getRoleIcon()}
                <div>
                  <p className="text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-600">
                    {role?.toLowerCase() === "service_account"
                      ? "SUPER ADMIN"
                      : `${role?.toUpperCase()} - ${organization?.role}`}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChangePassword(true)}
                className="gap-2"
              >
                <KeyRound className="w-4 h-4" />
                Change Password
              </Button>

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

      {showChangePassword && (
        <ChangePasswordDialog
          open={showChangePassword}
          onOpenChange={setShowChangePassword}
          user={user}
          organization={organization}
        />
      )}
    </div>
  );
};

export default Main;
