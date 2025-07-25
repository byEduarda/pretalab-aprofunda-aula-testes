import { User } from '../entities/User';

export interface UserRepository {
  save(user: User): Promise<User>;               
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<void>
}