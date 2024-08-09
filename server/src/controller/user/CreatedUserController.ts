import { Request, Response } from "express";
import { CreatedUserService } from "../../services/user/CreatedUserService";

export class CreatedUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createdUserService = new CreatedUserService();
    const user = await createdUserService.execute({ name, email, password });
    return res.json(user);
  }
}
