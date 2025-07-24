"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const repositoryInstance_1 = require("../../infra/database/repositoryInstance");
const CreateUser_1 = require("../../core/usecases/CreateUser");
class CreateUserController {
    async handle(req, res) {
        const { name, login, email, password } = req.body;
        try {
            const createUser = new CreateUser_1.CreateUser(repositoryInstance_1.userRepository);
            const user = await createUser.execute({ name, login, email, password });
            const { password: _, ...userWithoutPassword } = user;
            return res.status(201).json(userWithoutPassword);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CreateUserController = CreateUserController;
