import { PrismaClient } from "@prisma/client";
import { passwordUtil } from "../utils/password.util";

const prisma = new PrismaClient();

export class UserService {
  async create(data: { email: string; password: string }) {
    const hashedPassword = await passwordUtil.hash(data.password);
    console.log("data", data);
    return prisma.user.create({
      data: {
        ...data,
        name: "用户" + new Date().getTime(),
        password: hashedPassword,
      },
    });
  }

  async findByEmailNPwd(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isValid = await passwordUtil.verify(password, user.password);
    return isValid ? user : null;
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return {};

    return user;
  }

  async refreshToken(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  async updateScore(userId: number, score: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { score },
    });
  }
}
