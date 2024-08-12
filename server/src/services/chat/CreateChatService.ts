import prismaClient from "../../prisma";
import validator = require("validator");

interface ChatRequest {
  firstId: string;
  secondId: string;
}

export class CreatedChatService {
  async execute({ firstId, secondId }: ChatRequest) {
    // Verificar se ele enviou um email
    if (!firstId || !secondId) {
      throw new Error(
        "Chat cannot be created because one of the IDs was missing"
      );
    }
    // Verificar se esse email já está cadastrado na plataforma
    const chatAlreadyExists = await prismaClient.chat.findFirst({
      where: {
        members: { $all: { firstId, secondId } },
      },
    });

    if (chatAlreadyExists) {
      return chatAlreadyExists;
    }
  }
}
