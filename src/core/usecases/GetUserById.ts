import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}