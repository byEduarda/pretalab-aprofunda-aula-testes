"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../infra/server/server"));
describe("PATCH /users:id", () => {
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
    it("deve alterar o nome com sucesso", async () => {
        const response = await (0, supertest_1.default)(server_1.default).patch(`/users/${userId}`).send({
            name: "Clementina da Silva",
        });
        expect(response.status).toBe(200);
    });
    it.skip("deve retornarn 404 quando um id for inválido", async () => {
        const response = await (0, supertest_1.default)(server_1.default).patch(`/users/123`).send({
            name: "Clementina da Silva",
        });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Usuário não encontrado");
    });
});
