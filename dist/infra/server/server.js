"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../../app/controllers/routes/user.routes");
const post_routes_1 = require("../../app/controllers/routes/post.routes");
const mongooseConnection_1 = require("../database/mongooseConnection");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', user_routes_1.userRoutes);
app.use('/posts', post_routes_1.postRoutes);
const URI = process.env.MONGO_URI;
if (!URI) {
    throw new Error(' a variavel não está definida');
}
(0, mongooseConnection_1.connectMongo)(URI);
exports.default = app;
