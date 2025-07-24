import { Request, Response } from "express";
import { AuthUser } from "../../core/usecases/AuthUser";
import { userRepository } from "../../infra/database/repositoryInstance";

export class AuthController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const authUser = new AuthUser(userRepository);
      const token = await authUser.execute({ email, password });
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}