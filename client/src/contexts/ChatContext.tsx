"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { useUserContext } from "./AuthContext";

type User = {
  user_Id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
};

type Chat = {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ChatContextType = {
  userChats: Chat[] | null;
  isUserChatsLoading: boolean;
  userChatsError: string | null;
  potentialChats: User[];
  createChat: (firstId: string, secondId: string) => Promise<void>;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export function ChatProvider({ children }: ChatProviderProps) {
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  const [potentialChats, setPotentialChats] = useState<User[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    const getUsers = async () => {
      setIsUserChatsLoading(true);
      try {
        const response = await api.get("/users");
        setIsUserChatsLoading(false);

        if (response.status === 400) {
          setUserChatsError(response.data);
          return;
        }

        const pChats = response.data.filter((u: User) => {
          if (user?.user_Id === u.user_Id) return false;

          const isChatCreated = userChats.some((chat) =>
            chat.members.includes(u.user_Id)
          );

          return !isChatCreated;
        });

        setPotentialChats(pChats);
      } catch (error: any) {
        setUserChatsError(error.message);
        setIsUserChatsLoading(false);
      }
    };

    getUsers();
  }, [userChats, user]);

  useEffect(() => {
    const getUserChats = async () => {
      setIsUserChatsLoading(true);
      if (user?.user_Id) {
        try {
          const response = await api.post("/chat/finduserchat", {
            user_Id: user.user_Id,
          });
          setIsUserChatsLoading(false);

          if (response.status === 400) {
            setUserChatsError(response.data);
            return;
          }

          setUserChats(response.data);
        } catch (error: any) {
          setUserChatsError(error.message);
          setIsUserChatsLoading(false);
        }
      }
    };

    getUserChats();
  }, [user]);

  const createChat = useCallback(async (firstId: string, secondId: string) => {
    try {
      const response = await api.post("/chat/createchat", {
        firstId,
        secondId,
      });

      if (response.status === 400) {
        setUserChatsError(response.data);
        return;
      }

      setUserChats((prev) => [...prev, response.data]);
    } catch (error: any) {
      setUserChatsError(error.message);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
