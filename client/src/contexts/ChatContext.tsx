"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  user_id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
};

type ChatContextType = {};

interface ChatProviderProps {
  children: ReactNode;
  user: User;
}

export const ChatContext = createContext({} as ChatContextType);

export function ChatProvider({ children, user }: ChatProviderProps) {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.user_id) {
        const response = await api.post("/chat/createchat", {
          user_Id: user.user_id,
        });
      }
    };
  }, [user]);
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
