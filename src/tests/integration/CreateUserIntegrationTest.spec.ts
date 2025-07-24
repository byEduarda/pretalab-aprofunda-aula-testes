import request from "supertest";
import mongoose from "mongoose";
import app from "../../infra/server/server";
import { userModel } from "../../infra/database/mongooseUserModel";

describe("User Integration Tests", () => {
  beforeAll(async () => {
    const testDbUri = process.env.MONGO_TEST_URI || "default";

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(testDbUri);
    }
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /users", () => {
    it("deve criar um novo usuário com sucesso", async () => {
      const userData = {
        name: "Dandara da Silva",
        login: "dandara1995",
        email: "dandara@example.com",
        password: "123456",
      };

      const response = await request(app).post("/users").send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", userData.name);
      expect(response.body).toHaveProperty("email", userData.email);
      expect(response.body).toHaveProperty("login", userData.login);
      expect(response.body).not.toHaveProperty("password");
    });

    it("deve retornar erro em caso de email duplicado", async () => {
      const userData = {
        name: "Dandara da Silva",
        login: "dandara1995",
        email: "dandara@example.com",
        password: "123456",
      };

      await request(app).post("/users").send(userData);

      const duplicateUserData = {
        name: "Bianca Santana",
        login: "bianca1995",
        email: "dandara@example.com",
        password: "outrasenha",
      };

      const response = await request(app)
        .post("/users")
        .send(duplicateUserData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("deve retornar erro quando campos obrigatórios estão ausentes", async () => {
      const incompleteUserData = {
        name: "Test User",
      };

      const response = await request(app)
        .post("/users")
        .send(incompleteUserData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("deve aceitar qualquer formato de email (sem validação)", async () => {
      const userData = {
        name: "Test User",
        login: "testuser",
        email: "email-invalido",
        password: "123456",
      };

      const response = await request(app).post("/users").send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email", userData.email);
    });
  });

  describe("POST /users/login", () => {
    beforeEach(async () => {
      await request(app).post("/users").send({
        name: "Test User",
        login: "testuser",
        email: "test@example.com",
        password: "123456",
      });
    });

    it("deve fazer login com credenciais válidas", async () => {
      const loginData = {
        email: "test@example.com",
        password: "123456",
      };

      const response = await request(app).post("/users/login").send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    });

    it("deve retornar erro com email inexistente", async () => {
      const loginData = {
        email: "inexistente@example.com",
        password: "123456",
      };

      const response = await request(app).post("/users/login").send(loginData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "credenciais inválidas");
    });

    it("deve retornar erro com senha incorreta", async () => {
      const loginData = {
        email: "test@example.com",
        password: "senhaerrada",
      };

      const response = await request(app).post("/users/login").send(loginData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "credenciais inválidas");
    });
  });

  describe("GET /users/me", () => {
    let authToken: string;

    beforeEach(async () => {
      await request(app).post("/users").send({
        name: "Test User",
        login: "testuser",
        email: "test@example.com",
        password: "123456",
      });

      const loginResponse = await request(app).post("/users/login").send({
        email: "test@example.com",
        password: "123456",
      });

      authToken = loginResponse.body.token;
    });

    it("deve retornar dados do usuário autenticado", async () => {
      const response = await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "rota protegida");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("userId");
      expect(response.body.user).toHaveProperty("email", "test@example.com");
    });

    it("deve retornar erro sem token de autorização", async () => {
      const response = await request(app).get("/users/me");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "token não enviado");
    });

    it("deve retornar erro com token inválido", async () => {
      const response = await request(app)
        .get("/users/me")
        .set("Authorization", "Bearer token_invalido");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "token inválido");
    });
  });
});