"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
async function connectMongo(uri) {
    try {
        await mongoose_1.default.connect(uri);
        console.log('Mongo Atlas conectado');
    }
    catch (e) {
        console.error('falha na conexão mongo', e);
        process.exit(1);
    }
}
