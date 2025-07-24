"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const authMiddlewares_1 = require("../../../shared/middlewares/authMiddlewares");
const CreateUserController_1 = require("../CreateUserController");
const GetUserByIdController_1 = require("../GetUserByIdController");
const UpdateUserByIdController_1 = require("../UpdateUserByIdController");
const DeleteUserByIdController_1 = require("../DeleteUserByIdController");
const AuthController_1 = require("../AuthController");
const router = (0, express_1.Router)();
exports.userRoutes = router;
const createUserController = new CreateUserController_1.CreateUserController();
const getUserByIdController = new GetUserByIdController_1.GetUserByIdController();
const updateUserByIdController = new UpdateUserByIdController_1.UpdateUserByController();
const deleteUserByIdController = new DeleteUserByIdController_1.DeleteUserByIdController();
const login = new AuthController_1.AuthController();
router.post("/", async (req, res) => {
    await createUserController.handle(req, res);
});
router.post("/login", async (req, res) => {
    await login.handle(req, res);
});
router.get("/me", authMiddlewares_1.autenticar, async (req, res) => {
    res.json({ message: "rota protegida", user: req.user });
});
router.get("/:id", async (req, res) => {
    await getUserByIdController.handle(req, res);
});
router.patch("/:id", async (req, res) => {
    await updateUserByIdController.handle(req, res);
});
router.delete("/:id", async (req, res) => {
    await deleteUserByIdController.handle(req, res);
});
