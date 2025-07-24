import { UserRepository } from '../repositories/UserRepository';

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if(!user){
        throw new Error('usuário não encontrado')
    }

    await this.userRepository.delete(id)

  }
}