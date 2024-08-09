import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface PayLoad {
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    //validar esse token
    const { sub } = verify(token, process.env.JWT_SECRET as string) as PayLoad;

    //Valida se o sub é compativel com algum do banco de dados
    const user = await prismaClient.user.findFirst({
      where: {
        user_id: sub,
      },
    });

    if (!user) throw new Error("");

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
