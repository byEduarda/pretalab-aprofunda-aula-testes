"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id, data) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('usuário não encontrado');
        }
        if (data.name)
            user.name = data.name;
        if (data.login)
            user.login = data.login;
        if (data.email)
            user.email = data.email;
        if (data.password)
            user.password = data.password;
        return user;
    }
}
exports.UpdateUser = UpdateUser;
