import { Router } from "express";
import { autenticar } from "../../../shared/middlewares/authMiddlewares";
import { CreateUserController } from "../CreateUserController";
import { GetUserByIdController } from "../GetUserByIdController";
import { UpdateUserByController } from "../UpdateUserByIdController";
import { DeleteUserByIdController } from "../DeleteUserByIdController";
import { AuthController } from "../AuthController";

const router = Router();

const createUserController = new CreateUserController();
const getUserByIdController = new GetUserByIdController();
const updateUserByIdController = new UpdateUserByController();
const deleteUserByIdController = new DeleteUserByIdController();
const login = new AuthController();

router.post("/", async (req, res) => {
  await createUserController.handle(req, res);
});
router.post("/login", async (req, res) => {
  await login.handle(req, res);
});

router.get("/me", autenticar, async (req, res) => {
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

export { router as userRoutes };