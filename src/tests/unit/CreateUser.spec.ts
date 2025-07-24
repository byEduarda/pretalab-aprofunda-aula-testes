import { User } from "../../core/entities/User";
import { CreateUser } from "../../core/usecases/CreateUser";
import { InMemoryUserRepository } from "../../infra/database/inMemoryUserRepository";

describe("CreateUser (UseCase)", () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it("deve criar um usuário com sucesso", async () => {
    const createUser = new CreateUser(userRepository);

    const userData = {
      name: "João Silva",
      login: "joao123",
      email: "joao@example.com",
      password: "password123",
    };

    const user = await createUser.execute(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.login).toBe(userData.login);
    expect(user.id).toBeDefined();
  });

  it("deve lançar erro ao tentar criar usuário com email duplicado", async () => {
    const createUser = new CreateUser(userRepository);

    const userData = {
      name: "João Silva",
      login: "joao123",
      email: "joao@example.com",
      password: "password123",
    };

    await createUser.execute(userData);

    const duplicateUserData = {
      name: "Maria Santos",
      login: "maria456",
      email: "joao@example.com",
      password: "password456",
    };

    await expect(createUser.execute(duplicateUserData)).rejects.toThrow();
  });

  it("deve lançar erro ao tentar criar usuário com login duplicado", async () => {
    const createUser = new CreateUser(userRepository);

    const userData = {
      name: "João Silva",
      login: "joao123",
      email: "joao@example.com",
      password: "password123",
    };

    await createUser.execute(userData);

    const duplicateUserData = {
      name: "Maria Santos",
      login: "joao123",
      email: "maria@example.com",
      password: "password456",
    };

    await expect(createUser.execute(duplicateUserData)).rejects.toThrow();
  });
});