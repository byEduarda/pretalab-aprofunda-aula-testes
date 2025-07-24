"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllWithUserController = void 0;
const GetAllWithUser_1 = require("../../core/usecases/GetAllWithUser");
const MongoPostRepository_1 = require("../../infra/database/MongoPostRepository");
class GetAllWithUserController {
    async handle(req, res) {
        try {
            const postRepo = new MongoPostRepository_1.MongoPostRepository();
            const getPosts = new GetAllWithUser_1.GetAllwithUser(postRepo);
            const result = await getPosts.execute();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: "error ao buscar posts" });
        }
    }
}
exports.GetAllWithUserController = GetAllWithUserController;
