import { ReactNode } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { Permission } from "@/src/constants/permission";

type ProtectedProps = {
  permission: keyof Permission;
  children: ReactNode;
};

const ProtectedComponent = ({ permission, children }: ProtectedProps) => {
  const { permissions, loading } = useAuth();

  if (loading) return <p>Đang tải...</p>;

  if (!permissions || !permissions[permission]) {
    return <></>;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
