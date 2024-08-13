"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "./AuthContext";
import { ChatProvider } from "./ChatContext";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider
      themes={["dark", "custom", "light"]}
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ChatProvider>{children}</ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
