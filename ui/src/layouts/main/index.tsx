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
  const { user, logout } = useAuthContext();

  const { name, role, organization } = user;

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

  const uploadPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log("type: ", file.type);
    if (file.type !== " application/pdf") {
      alert("can only upload pdf");
    }
    if (file.size > 10 * 1024 * 1024) alert("file too big!");
    
    

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
                className="w-auto h-10 object-cover drop-shadow-lg drop-shadow-blue-400"
              />

              <p className="text-xs text-gray-500 text-shadow-lg text-shadow-purple-200">
                Specialty Test Intelligence Platform
              </p>
            </div>

            <div className="flex items-center gap-4">
              {organization?.role === "LAB" && (
                <div>
                  <input type="file" onChange={uploadPdf} className="border" />
                </div>
              )}

              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
                {getRoleIcon()}
                <div>
                  <p className="text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-600">
                    {role.toUpperCase()} - {organization?.role}
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
