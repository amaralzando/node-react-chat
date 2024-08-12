import { Request, Response } from "express";
import { CreatedChatService } from "../../services/chat/CreateChatService";

export class CreateChatController {
  async handle(req: Request, res: Response) {
    const { firstId, secondId } = req.body;

    const createChatService = new CreatedChatService();
    const chat = await createChatService.execute({
      firstId,
      secondId,
    });
    return res.json(chat);
  }
}
