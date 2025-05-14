import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
  avatarUrl?: string | null;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useQuery<{ isAuthenticated: boolean; user?: User }>({
    queryKey: ["/api/auth/status"],
  });

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        isAuthenticated: data?.isAuthenticated || false,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}