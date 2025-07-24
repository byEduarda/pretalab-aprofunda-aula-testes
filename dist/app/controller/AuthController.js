"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthUser_1 = require("../../core/usecases/AuthUser");
const repositoryInstance_1 = require("../../infra/database/repositoryInstance");
class AuthController {
    async handle(req, res) {
        const { email, password } = req.body;
        try {
            const authUser = new AuthUser_1.AuthUser(repositoryInstance_1.userRepository);
            const token = await authUser.execute({ email, password });
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
}
exports.AuthController = AuthController;
