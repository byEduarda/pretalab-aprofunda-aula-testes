"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
class DeleteUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('usuário não encontrado');
        }
        await this.userRepository.delete(id);
    }
}
exports.DeleteUser = DeleteUser;
