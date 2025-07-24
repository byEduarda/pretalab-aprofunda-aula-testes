import request from "supertest";

import app from "../../infra/server/server";

describe("PATCH /users:id", () => {
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
  it("deve alterar o nome com sucesso", async () => {
    const response = await request(app).patch(`/users/${userId}`).send({
      name: "Clementina da Silva",
    });

    expect(response.status).toBe(200);
  });

  it.skip("deve retornarn 404 quando um id for inválido", async () => {
    const response = await request(app).patch(`/users/123`).send({
      name: "Clementina da Silva",
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Usuário não encontrado");
  });
});