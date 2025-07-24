"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../core/entities/User");
const DeleteUser_1 = require("../../core/usecases/DeleteUser");
const inMemoryUserRepository_1 = require("../../infra/database/inMemoryUserRepository");
describe("DeleteUser (UseCase)", () => {
    let userRepository;
    beforeEach(() => {
        userRepository = new inMemoryUserRepository_1.InMemoryUserRepository();
    });
    it("deve deletar um usuário existente com sucesso", async () => {
        const user = new User_1.User("1", "Maria", "maria123", "maria@example.com", "password123");
        await userRepository.save(user);
        const deleteUser = new DeleteUser_1.DeleteUser(userRepository);
        await deleteUser.execute(user.id);
        const deletedUser = await userRepository.findById(user.id);
        expect(deletedUser).toBeNull();
    });
    it("deve lançar erro ao tentar deletar usuário inexistente", async () => {
        const deleteUser = new DeleteUser_1.DeleteUser(userRepository);
        await expect(deleteUser.execute("id-inexistente")).rejects.toThrow();
    });
});
