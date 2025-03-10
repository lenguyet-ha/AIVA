import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Permission,
  permissions,
  Role,
  rolePermissions,
  roleRestrictedPages,
} from "../constants/permission";

type AuthContextType = {
  role: Role | null;
  permissions: Permission | null;
  loading: boolean;
  canAccess: (value: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [permissionsData, setPermissionsData] = useState<Permission | null>(
    null,
  );
  const userRole = "ADMIN"; //default fake data
  const [loading, setLoading] = useState<boolean>(true);

  const canAccess = (page: string) => {
    if (!role) return false;
    return !roleRestrictedPages[role]?.includes(page); // Nếu không bị cấm thì được phép truy cập
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get("/api/auth/me"); // Gọi API lấy user
        // const userRole: Role = response.data.role;
        setRole(userRole);
        setPermissionsData(permissions[userRole]); // Ánh xạ role → permission
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ role, permissions: permissionsData, canAccess, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
