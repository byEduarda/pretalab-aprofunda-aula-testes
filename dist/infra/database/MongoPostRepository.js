"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoPostRepository = void 0;
const Post_1 = require("../../core/entities/Post");
const mongoosePostModel_1 = require("./mongoosePostModel");
class MongoPostRepository {
    async save(post) {
        await mongoosePostModel_1.PostModel.create(post);
    }
    async findByUserId(userId) {
        const posts = await mongoosePostModel_1.PostModel.find({ userId }).lean();
        return posts.map((post) => new Post_1.Post(post.title || "", post.content || "", post.userId?.toString() || ""));
    }
    async getAllWithUser() {
        return mongoosePostModel_1.PostModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    _id: false,
                    title: true,
                    content: true,
                    "user.name": true,
                    "user.email": true,
                },
            },
        ]);
    }
}
exports.MongoPostRepository = MongoPostRepository;
