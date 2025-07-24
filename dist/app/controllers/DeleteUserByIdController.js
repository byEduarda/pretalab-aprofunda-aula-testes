"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserByIdController = void 0;
const DeleteUser_1 = require("../../core/usecases/DeleteUser");
const repositoryInstance_1 = require("../../infra/database/repositoryInstance");
class DeleteUserByIdController {
    async handle(req, res) {
        const { id } = req.params;
        const deleteUser = new DeleteUser_1.DeleteUser(repositoryInstance_1.userRepository);
        try {
            if (!id) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            await deleteUser.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}
exports.DeleteUserByIdController = DeleteUserByIdController;
