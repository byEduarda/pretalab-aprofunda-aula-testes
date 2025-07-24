import { User } from "../../core/entities/User";
import { DeleteUser } from "../../core/usecases/DeleteUser";
import { InMemoryUserRepository } from "../../infra/database/inMemoryUserRepository";

describe("DeleteUser (UseCase)", () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it("deve deletar um usuário existente com sucesso", async () => {
    const user = new User(
      "1",
      "Maria",
      "maria123",
      "maria@example.com",
      "password123"
    );
    await userRepository.save(user);

    const deleteUser = new DeleteUser(userRepository);
    await deleteUser.execute(user.id as string);

    const deletedUser = await userRepository.findById(user.id!);
    expect(deletedUser).toBeNull();
  });

  it("deve lançar erro ao tentar deletar usuário inexistente", async () => {
    const deleteUser = new DeleteUser(userRepository);

    await expect(deleteUser.execute("id-inexistente")).rejects.toThrow();
  });
});