import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../entities/Post";

export class CreatePost {
  constructor(private postRepo: PostRepository) {}

  async execute(post: Post): Promise<void> {
    await this.postRepo.save(post);
  }
}