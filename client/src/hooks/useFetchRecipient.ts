import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Chat {
  _id: string;
  members: string[]; // Array de IDs de usuários
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface User {
  user_Id: string;
  name: string;
  email: string;
}

interface RecipientUser {
  user_Id: string;
  name: string;
  email: string;
}

interface UserListChatsProps {
  chat: Chat;
  user: User;
}

export const useFetchRecipientUser = ({ chat, user }: UserListChatsProps) => {
  const [recipientUser, setRecipientUser] = useState<RecipientUser | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const recipientid = chat?.members.find((id: string) => id !== user?.user_Id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientid) return;

      try {
        const resp = await api.post("/user/me", { user_Id: recipientid });
        setRecipientUser({
          user_Id: resp.data._id,
          name: resp.data.name,
          email: resp.data.email,
        });
      } catch (erro: any) {
        setError(erro.message);
      }
    };

    getUser();
  }, [recipientid]);

  return { recipientUser, error };
};
