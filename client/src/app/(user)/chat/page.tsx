"use client";

import PotentialChats from "@/src/components/potentialChats";
import { Separator } from "@/src/components/ui/separator";
import UserListChats from "@/src/components/userListChats";
import { useUserContext } from "@/src/contexts/AuthContext";
import { useChatContext } from "@/src/contexts/ChatContext";

const ChatPage = () => {
  const { userChats, isUserChatsLoading, userChatsError } = useChatContext();
  const { user } = useUserContext();

  // Garantir que 'user' não seja 'undefined'
  if (!user) {
    return <p>Usuário não encontrado</p>; // Ou uma outra abordagem de fallback
  }

  return (
    <div>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <div className="w-full flex p-4 justify-start gap-4">
          {isUserChatsLoading && <p>Carregando chats...</p>}
          {userChats &&
            userChats.map((chat: any, index: number) => (
              <div key={index}>
                <UserListChats chat={chat} user={user} />
                <Separator className="mb-2" />
              </div>
            ))}
          <p>ChatBox</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
