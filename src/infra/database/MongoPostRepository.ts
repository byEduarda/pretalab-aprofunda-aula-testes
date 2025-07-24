import { PostRepository } from "../../core/repositories/PostRepository";
import { Post } from "../../core/entities/Post";
import { PostModel } from "../database/mogoosePostModel";
import { PostWithUserDTO } from "../../core/entities/PostWithUserDTO";

export class MongoPostRepository implements PostRepository {
  async save(post: Post): Promise<void> {
    await PostModel.create(post);
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const posts = await PostModel.find({ userId }).lean();
    return posts.map(
      (post) =>
        new Post(
          post.title || "",
          post.content || "",
          post.userId?.toString() || ""
        )
    );
  }

  async getAllWithUser(): Promise<PostWithUserDTO[]> {
    return PostModel.aggregate([
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