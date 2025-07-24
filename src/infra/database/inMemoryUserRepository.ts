import { User } from '../../core/entities/User';
import { UserRepository } from '../../core/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

 async save(user: User): Promise<User> {
    const existingIndex = this.users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
      return this.users[existingIndex];
    } else {
      this.users.push(user);
      return user;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null; 
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = this.users.find((u) => u.login === login);
    return user || null;
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...userData } as User;
    return this.users[userIndex];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async getAll(): Promise<User[]> {
    return [...this.users];
  }
}