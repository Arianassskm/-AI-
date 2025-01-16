import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { TokenService } from "../services/token.service";

const userService = new UserService();
const tokenService = new TokenService();

export class UserController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "邮箱和密码不能为空" });
      }

      const user = await userService.findByEmailNPwd(email, password);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "邮箱或密码错误" });
      }

      const tokens = tokenService.generateAuthTokens(user);

      return res.json({
        ...tokens,
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res
          .status(400)
          .json({ success: false, message: "刷新令牌不能为空" });
      }

      const user = await tokenService.verifyRefreshToken(refreshToken);

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "无效的刷新令牌" });
      }

      const tokens = tokenService.generateAuthTokens(user);

      return res.status(200).json({ success: true, data: tokens });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }
      const user = await userService.findById(userId);
      return res.json({ success: true, data: user, message: "获取用户成功" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      await userService.create(req.body);
      return res.json({
        success: true,
        message: "注册成功",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  updateScore = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "未授权" });
      }

      const { score } = req.body;
      await userService.updateScore(userId, score);
      return res.json({ success: true, message: "更新评分成功" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
