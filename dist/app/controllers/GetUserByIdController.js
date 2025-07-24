"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdController = void 0;
const repositoryInstance_1 = require("../../infra/database/repositoryInstance");
class GetUserByIdController {
    async handle(req, res) {
        const { id } = req.params;
        try {
            const user = await repositoryInstance_1.userRepository.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.GetUserByIdController = GetUserByIdController;
