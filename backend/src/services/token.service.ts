import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TokenService {
  private generateToken(payload: any, expiresIn: string) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn });
  }

  generateAuthTokens(user: { id: number; email: string }) {
    const accessToken = this.generateToken(
      { id: user.id, email: user.email },
      config.jwtExpiresIn
    );

    const refreshToken = this.generateToken(
      { id: user.id, type: "refresh" },
      "30d"
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyRefreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as {
        id: number;
        type: string;
      };

      if (decoded.type !== "refresh") {
        throw new Error("Invalid token type");
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      return user;
    } catch (error) {
      return null;
    }
  }
}
