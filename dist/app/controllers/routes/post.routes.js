"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const CreatePostController_1 = require("../CreatePostController");
const GetAllWithUserController_1 = require("../GetAllWithUserController");
const GetMyPostsController_1 = require("../GetMyPostsController");
const authMiddlewares_1 = require("../../../shared/middlewares/authMiddlewares");
const router = (0, express_1.Router)();
exports.postRoutes = router;
const createPostController = new CreatePostController_1.CreatePostController();
const getAllWithUserController = new GetAllWithUserController_1.GetAllWithUserController();
const getMyPostsController = new GetMyPostsController_1.GetMyPostsController();
router.post("/", authMiddlewares_1.autenticar, async (req, res) => {
    await createPostController.handle(req, res);
});
router.get("/my-posts", authMiddlewares_1.autenticar, async (req, res) => {
    await getMyPostsController.handle(req, res);
});
router.get("/posts", async (req, res) => {
    await getAllWithUserController.handle(req, res);
});
