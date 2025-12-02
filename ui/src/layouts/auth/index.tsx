import React, { type ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
};

export default Auth;
