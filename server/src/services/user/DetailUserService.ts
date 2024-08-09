import prismaClient from "../../prisma";

export class DetailUserService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        user_id: user_id,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
