import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

import { formatChatDate, getInitials } from "../helpers/utis";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";

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

interface UserListChatsProps {
  chat: Chat;
  user: User;
}

const UserListChats = ({ chat, user }: UserListChatsProps) => {
  const { recipientUser } = useFetchRecipientUser({ chat, user });

  return (
    <button
      onClick={() => {}}
      className="flex items-center justify-between gap-4 mb-2 p-2 hover:bg-gray-700 rounded-md transition duration-500"
    >
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{getInitials(recipientUser?.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {recipientUser?.name}{" "}
            <span className="w-3 h-3 bg-green-500 text-xs font-bold flex items-center justify-center rounded-full"></span>
          </div>
          <div>Mensagem de texto</div>
        </div>
      </div>
      <div className="flex flex flex-col items-end gap-2">
        <div>{formatChatDate(chat?.updatedAt)}</div>
        <div className="w-6 h-6 bg-red-500 text-xs font-bold flex items-center justify-center rounded-full">
          2
        </div>
      </div>
    </button>
  );
};

export default UserListChats;
