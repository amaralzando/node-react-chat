import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import validator = require("validator");

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreatedUserService {
  async execute({ name, email, password }: UserRequest) {
    // Verificar se ele enviou um email
    if (!email) {
      throw new Error("Email incorrect");
    }
    // Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) throw new Error("E-mail already exists");

    if (!validator.isEmail(email)) throw new Error("E-mail is not valid");

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
      },
    });

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.user_id,
        expiresIn: "30d",
      }
    );

    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}
