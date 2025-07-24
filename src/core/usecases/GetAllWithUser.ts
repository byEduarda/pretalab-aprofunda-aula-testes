import { PostRepository } from "../repositories/PostRepository";
import { PostWithUserDTO } from "../entities/PostWithUserDTO";

export class GetAllwithUser {
  constructor(private postRepository: PostRepository) {}

  async execute(): Promise<PostWithUserDTO[]> {
    return this.postRepository.getAllWithUser();
  }
}