import { Request, Response } from "express";

export class SearchTestController {
  static async handle(req: Request, res: Response) {
    return res.json({ ok: true });
  }
}
