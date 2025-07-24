"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../core/entities/User");
const UpdateUser_1 = require("../../core/usecases/UpdateUser");
const inMemoryUserRepository_1 = require("../../infra/database/inMemoryUserRepository");
describe("UpdateUser (UseCase)", () => {
    let userRepository;
    beforeEach(() => {
        userRepository = new inMemoryUserRepository_1.InMemoryUserRepository();
    });
    it("deve atualizar um usuário existente com sucesso", async () => {
        const user = new User_1.User("1", "João Silva", "joao123", "joao@example.com", "password123");
        await userRepository.save(user);
        const updateUser = new UpdateUser_1.UpdateUser(userRepository);
        const updateData = {
            name: "João Santos",
            email: "joao.santos@example.com",
        };
        const updatedUser = await updateUser.execute("1", updateData);
        expect(updatedUser).toBeInstanceOf(User_1.User);
        expect(updatedUser?.name).toBe("João Santos");
        expect(updatedUser?.email).toBe("joao.santos@example.com");
        expect(updatedUser?.login).toBe("joao123");
    });
    it("deve retornar null ao tentar atualizar usuário inexistente", async () => {
        const updateUser = new UpdateUser_1.UpdateUser(userRepository);
        const updateData = {
            name: "Nome Atualizado",
        };
        const result = await updateUser.execute("id-inexistente", updateData);
        expect(result).toBeNull();
    });
    it("deve permitir atualização parcial dos dados", async () => {
        const user = new User_1.User("1", "João Silva", "joao123", "joao@example.com", "password123");
        await userRepository.save(user);
        const updateUser = new UpdateUser_1.UpdateUser(userRepository);
        const updatedUser = await updateUser.execute("1", { name: "João Santos" });
        expect(updatedUser?.name).toBe("João Santos");
        expect(updatedUser?.email).toBe("joao@example.com");
        expect(updatedUser?.login).toBe("joao123");
    });
});
