import { User } from "../../core/entities/User";
import { UpdateUser } from "../../core/usecases/UpdateUser";
import { InMemoryUserRepository } from "../../infra/database/inMemoryUserRepository";

describe("UpdateUser (UseCase)", () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it("deve atualizar um usuário existente com sucesso", async () => {
    const user = new User(
      "1",
      "João Silva",
      "joao123",
      "joao@example.com",
      "password123"
    );
    await userRepository.save(user);

    const updateUser = new UpdateUser(userRepository);

    const updateData = {
      name: "João Santos",
      email: "joao.santos@example.com",
    };

    const updatedUser = await updateUser.execute("1", updateData);

    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser?.name).toBe("João Santos");
    expect(updatedUser?.email).toBe("joao.santos@example.com");
    expect(updatedUser?.login).toBe("joao123");
  });

  it("deve retornar null ao tentar atualizar usuário inexistente", async () => {
    const updateUser = new UpdateUser(userRepository);

    const updateData = {
      name: "Nome Atualizado",
    };

    const result = await updateUser.execute("id-inexistente", updateData);
    expect(result).toBeNull();
  });

  it("deve permitir atualização parcial dos dados", async () => {
    const user = new User(
      "1",
      "João Silva",
      "joao123",
      "joao@example.com",
      "password123"
    );
    await userRepository.save(user);

    const updateUser = new UpdateUser(userRepository);

    const updatedUser = await updateUser.execute("1", { name: "João Santos" });

    expect(updatedUser?.name).toBe("João Santos");
    expect(updatedUser?.email).toBe("joao@example.com");
    expect(updatedUser?.login).toBe("joao123");
  });
});