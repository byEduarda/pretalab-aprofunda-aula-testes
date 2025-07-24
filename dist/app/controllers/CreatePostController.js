"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostController = void 0;
const CreatePost_1 = require("../../core/usecases/CreatePost");
const MongoPostRepository_1 = require("../../infra/database/MongoPostRepository");
const Post_1 = require("../../core/entities/Post");
class CreatePostController {
    async handle(req, res) {
        const { title, content } = req.body;
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        if (!title || !content) {
            return res
                .status(400)
                .json({ error: "Título e conteúdo são obrigatórios" });
        }
        const post = new Post_1.Post(title, content, userId);
        const postRepo = new MongoPostRepository_1.MongoPostRepository();
        const createPost = new CreatePost_1.CreatePost(postRepo);
        try {
            await createPost.execute(post);
            return res.status(201).json({ message: "Post criado com sucesso!" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CreatePostController = CreatePostController;
