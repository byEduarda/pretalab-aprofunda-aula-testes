"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../infra/server/server"));
describe("DELETE /users:id", () => {
    let userId;
    beforeAll(async () => {
        const { body } = await (0, supertest_1.default)(server_1.default).post("/users").send({
            name: "Dandara da Silva",
            login: "dandara1995",
            email: "dandara@example.com",
            password: "123456",
        });
        userId = body.id;
    });
    it("deve retornar 204 quando remover um usuário com sucesso", async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete(`/users/${userId}`);
        expect(response.status).toBe(204);
    });
    it("deve retornar 404 quando tentar remover um usuário inexistente", async () => {
        const response = await (0, supertest_1.default)(server_1.default).delete(`/users/123`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Usuário não encontrado");
    });
});
