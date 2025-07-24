import { Request, Response } from "express";
import { CreatePost } from "../../core/usecases/CreatePost";
import { MongoPostRepository } from "../../infra/database/MongoPostRepository";
import { Post } from "../../core/entities/Post";

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, content } = req.body;

    const userId = (req.user as any)?.userId || (req.user as any)?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "Título e conteúdo são obrigatórios" });
    }

    const post = new Post(title, content, userId);

    const postRepo = new MongoPostRepository();
    const createPost = new CreatePost(postRepo);

    try {
      await createPost.execute(post);
      return res.status(201).json({ message: "Post criado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}