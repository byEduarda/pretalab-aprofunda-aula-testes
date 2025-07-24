"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../core/entities/User");
const CreateUser_1 = require("../../core/usecases/CreateUser");
const inMemoryUserRepository_1 = require("../../infra/database/inMemoryUserRepository");
describe("CreateUser (UseCase)", () => {
    let userRepository;
    beforeEach(() => {
        userRepository = new inMemoryUserRepository_1.InMemoryUserRepository();
    });
    it("deve criar um usuário com sucesso", async () => {
        const createUser = new CreateUser_1.CreateUser(userRepository);
        const userData = {
            name: "João Silva",
            login: "joao123",
            email: "joao@example.com",
            password: "password123",
        };
        const user = await createUser.execute(userData);
        expect(user).toBeInstanceOf(User_1.User);
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
        expect(user.login).toBe(userData.login);
        expect(user.id).toBeDefined();
    });
    it("deve lançar erro ao tentar criar usuário com email duplicado", async () => {
        const createUser = new CreateUser_1.CreateUser(userRepository);
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
        const createUser = new CreateUser_1.CreateUser(userRepository);
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
