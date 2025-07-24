import { Request, Response } from "express";
import { MongoPostRepository } from "../../infra/database/MongoPostRepository";

export class GetMyPostsController {
  async handle(req: Request, res: Response) {
    const userId = (req.user as any)?.userId || (req.user as any)?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const postRepo = new MongoPostRepository();

    try {
      const posts = await postRepo.findByUserId(userId);
      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}