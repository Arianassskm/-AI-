import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { errorHandler } from "../utils/error-handler";

const userService = new UserService();

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const { email, password } = req.query;
      const users = await userService.findByEmailNPwd(email, password);
      res.json(users);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).json({ message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      console.log(req.body);
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).json({ message });
    }
  }
}
