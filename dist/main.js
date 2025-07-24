"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./infra/server/server"));
const environment_1 = require("./config/environment");
const PORT = environment_1.config.port;
server_1.default.listen(PORT, () => {
    console.log(`Servidor rodando ${PORT}`);
});
