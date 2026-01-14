import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu";
import {
  Building2,
  ChevronDown,
  FlaskConical,
  LogOut,
  ShieldCheck,
  Stethoscope,
  UserCircle,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/auth";
import { ImageWithFallback } from "@/components";
import UserProfileDialog from "./UserProfileDialog";
import { fetchProfileApi } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { sessionStorageUtil } from "@/lib/storage/sessionStorage";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";

export type UserProfileProps = {
  name: string;
  email: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
};

const Main = () => {
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);

  const { orgRole, role, user, logout } = useAuthContext();

  const { organization } = user;

  const { data: userProfileRes } = useQuery({
    queryKey: ["fetchProfileApi"],
    queryFn: fetchProfileApi,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!userProfileRes?.data) return;

    sessionStorageUtil.set(STORAGE_KEYS.USER_PROFILE, userProfileRes?.data);
  }, [userProfileRes?.data]);

  const userProfile = (userProfileRes?.data || {}) as UserProfileProps;

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    {getRoleIcon()}
                    <div className="text-left">
                      <p className="text-sm text-gray-900">
                        {userProfile?.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {role?.toLowerCase() === "service_account"
                          ? "SUPER ADMIN"
                          : `${role?.toUpperCase()} - ${organization?.role}`}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem
                    onClick={() => setShowUserProfile(true)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <UserCircle className="w-4 h-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      {showUserProfile && (
        <UserProfileDialog
          open={showUserProfile}
          onOpenChange={setShowUserProfile}
          user={user}
          userProfile={userProfile}
          organization={organization}
        />
      )}
    </div>
  );
};

export default Main;
