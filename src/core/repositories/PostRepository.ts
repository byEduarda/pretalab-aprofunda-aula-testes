import { Post } from "../entities/Post";
import { PostWithUserDTO } from "../entities/PostWithUserDTO";

export interface PostRepository {
  save(post: Post): Promise<void>;
  getAllWithUser(): Promise<PostWithUserDTO[]>;
  findByUserId(userId: string): Promise<Post[]>;
}