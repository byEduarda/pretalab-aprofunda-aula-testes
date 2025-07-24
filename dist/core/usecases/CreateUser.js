"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) {
            throw new Error('Usuário já existe com esse e-mail');
        }
        const hashPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = new User_1.User(data.name, data.login, data.email, hashPassword);
        const saved = await this.userRepository.save(user);
        return saved;
    }
}
exports.CreateUser = CreateUser;
