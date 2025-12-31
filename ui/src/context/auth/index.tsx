import { PATH_KEYS } from "@/lib/constants/pathKeys";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { localStorageUtil } from "@/lib/storage/localStorage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigate, Outlet } from "react-router-dom";

type AuthContextType = {
  token: string | null;
  orgRole: string | null;
  role: string | null;
  user: any | null;
  setToken: (T: string | null) => void;
  setOrgRole: (T: string | null) => void;
  setRole: (T: string | null) => void;
  setUser: (U: any | null) => void;
  login: (L: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorageUtil.get(STORAGE_KEYS.TOKEN)
  );
  const [orgRole, setOrgRole] = useState<string | null>(
    localStorageUtil.get(STORAGE_KEYS.ORG_ROLE)
  );
  const [role, setRole] = useState<string | null>(
    localStorageUtil.get(STORAGE_KEYS.ROLE)
  );
  const [user, setUser] = useState<any | null>(
    localStorageUtil.get(STORAGE_KEYS.USER)
  );

  useEffect(() => {
    if (token) localStorageUtil.set(STORAGE_KEYS.TOKEN, token);
    else localStorageUtil.remove(STORAGE_KEYS.TOKEN);
  }, [token]);

  useEffect(() => {
    if (orgRole) localStorageUtil.set(STORAGE_KEYS.ORG_ROLE, orgRole);
    else localStorageUtil.remove(STORAGE_KEYS.ORG_ROLE);
  }, [orgRole]);

  useEffect(() => {
    if (role) localStorageUtil.set(STORAGE_KEYS.ROLE, role);
    else localStorageUtil.remove(STORAGE_KEYS.ROLE);
  }, [role]);

  useEffect(() => {
    if (user) localStorageUtil.set(STORAGE_KEYS.USER, user);
    else localStorageUtil.remove(STORAGE_KEYS.USER);
  }, [user]);

  const login = (L: any) => {
    setToken(L.token);

    setOrgRole(L.orgRole);

    if (L.user?.role) {
      setRole(L.user?.role);
    }

    setUser(L.user);
  };

  const logout = () => {
    localStorageUtil.clear();
    setToken(null);
    setOrgRole(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        orgRole,
        role,
        user,
        setToken,
        setOrgRole,
        setRole,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PublicRoute = () => {
  const { token, orgRole, role } = useAuthContext();
  if (token) {
    switch (orgRole?.toLowerCase()) {
      case "facility":
        switch (role?.toLowerCase()) {
          case "user":
            return <Navigate to={PATH_KEYS.PROVIDER} replace />;
          default:
            return <Navigate to={PATH_KEYS.FACILITY} replace />;
        }
      case "lab":
        return <Navigate to={PATH_KEYS.LAB} replace />;
      default:
        return <Navigate to={PATH_KEYS.ADMIN} replace />;
    }
  }
  return <Outlet />;
};

const RequireAuth = () => {
  const { token } = useAuthContext();
  if (!token) return <Navigate to={PATH_KEYS.LOGIN} replace />;
  return <Outlet />;
};

interface RequireRoleProps {
  allowed: string[];
}

const RequireOrgRole = ({ allowed }: RequireRoleProps) => {
  const { orgRole } = useAuthContext();

  if (!orgRole) return <Navigate to={PATH_KEYS.LOGIN} replace />;
  return allowed
    .map((r) => r.toLowerCase())
    .includes(orgRole?.toLowerCase()) ? (
    <Outlet />
  ) : (
    <Navigate to={PATH_KEYS.FORBIDDEN} replace />
  );
};

const RequireRole = ({ allowed }: RequireRoleProps) => {
  const { role } = useAuthContext();

  if (!role) return <Navigate to={PATH_KEYS.LOGIN} replace />;
  return allowed.map((r) => r.toLowerCase()).includes(role?.toLowerCase()) ? (
    <Outlet />
  ) : (
    <Navigate to={PATH_KEYS.FORBIDDEN} replace />
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be within an AuthContext!");
  return context;
};

export {
  AuthContext,
  AuthProvider,
  PublicRoute,
  RequireAuth,
  RequireOrgRole,
  RequireRole,
  useAuthContext,
};
