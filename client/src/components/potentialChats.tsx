import { useUserContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import { getInitials } from "../helpers/utis";

const PotentialChats = () => {
  const { potentialChats, createChat } = useChatContext();
  const { user } = useUserContext();
  // Garantir que 'user' não seja 'undefined'
  if (!user) {
    return <p>Usuário não encontrado</p>; // Ou uma outra abordagem de fallback
  }

  return (
    <>
      <div className="flex gap-3">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-1 bg-green-950 p-1 rounded-md hover:bg-green-600 rounded-md transition duration-500"
                onClick={() => createChat(user?.user_Id, u.user_Id)}
              >
                {getInitials(u.name)}
                <span className="w-3 h-3 bg-green-500 text-xs font-bold flex items-center justify-center rounded-full"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
