import { prisma } from "../config/database";
import { AppError } from "../utils/error-handler";

export class UserService {
  async findAll() {
    return await prisma.user.findMany();
  }

  async findByEmailNPwd(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email, password: password },
    });
    console.log("获取用户", existingUser);

    if (!existingUser) {
      throw new AppError(400, "用户不存在");
    }

    return existingUser;
  }

  async create(data: { email: string; password: string }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    console.log(existingUser);
    if (existingUser) {
      throw new AppError(400, "该邮箱已被注册");
    }

    console.log("user:", { ...data, name: "用户" + new Date().getTime() });
    return await prisma.user.create({
      data: { ...data, name: "用户" + new Date().getTime() },
    });
  }
}
