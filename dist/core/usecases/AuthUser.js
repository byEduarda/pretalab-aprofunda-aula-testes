"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const jwt_1 = require("../../shared/helpers/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("credenciais inválidas");
        }
        const comparePassword = await bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            throw new Error("credenciais inválidas");
        }
        const token = (0, jwt_1.gerarToken)({ userId: user.id, email: user.email });
        return token;
    }
}
exports.AuthUser = AuthUser;
