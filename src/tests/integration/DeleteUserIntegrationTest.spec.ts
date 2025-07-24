import request from "supertest";

import app from "../../infra/server/server";

describe("DELETE /users:id", () => {
  let userId: string;

  beforeAll(async () => {
    const { body } = await request(app).post("/users").send({
      name: "Dandara da Silva",
      login: "dandara1995",
      email: "dandara@example.com",
      password: "123456",
    });
    userId = body.id;
  });
  it("deve retornar 204 quando remover um usuário com sucesso", async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(204);
  });

  it("deve retornar 404 quando tentar remover um usuário inexistente", async () => {
    const response = await request(app).delete(`/users/123`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Usuário não encontrado");
  });
});