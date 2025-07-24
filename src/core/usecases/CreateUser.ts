import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';

export interface ICreateUserInput {
  name: string;
  login: string;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: ICreateUserInput): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error('Usuário já existe com esse e-mail');
    }
const hashPassword = await bcrypt.hash(data.password, 10)
    const user = new User(
      data.name,
      data.login,
      data.email,
      hashPassword
    );

   const saved = await this.userRepository.save(user);
    return saved;
  }
}