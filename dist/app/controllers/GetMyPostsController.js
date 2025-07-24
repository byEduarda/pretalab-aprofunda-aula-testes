"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyPostsController = void 0;
const MongoPostRepository_1 = require("../../infra/database/MongoPostRepository");
class GetMyPostsController {
    async handle(req, res) {
        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }
        const postRepo = new MongoPostRepository_1.MongoPostRepository();
        try {
            const posts = await postRepo.findByUserId(userId);
            return res.status(200).json(posts);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.GetMyPostsController = GetMyPostsController;
