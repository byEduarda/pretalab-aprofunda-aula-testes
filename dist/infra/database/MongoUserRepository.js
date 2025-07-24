"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const User_1 = require("../../core/entities/User");
const mongooseUserModel_1 = require("../database/mongooseUserModel");
class MongoUserRepository {
    toEntity(doc) {
        return new User_1.User(doc.name, doc.login, doc.email, doc.password, doc._id.toString());
    }
    async save(user) {
        const doc = await mongooseUserModel_1.userModel.create(user);
        return this.toEntity(doc);
    }
    async findByEmail(email) {
        const doc = await mongooseUserModel_1.userModel.findOne({ email });
        return doc ? this.toEntity(doc) : null;
    }
    async findById(id) {
        const doc = await mongooseUserModel_1.userModel.findOne({ _id: id });
        return doc ? this.toEntity(doc) : null;
    }
    async update(user) {
        const doc = await mongooseUserModel_1.userModel.findByIdAndUpdate(user.id, {
            name: user.name,
            login: user.login,
            email: user.email,
            password: user.password,
        }, { new: true });
        return doc ? this.toEntity(doc) : null;
    }
    async delete(id) {
        await mongooseUserModel_1.userModel.findOneAndDelete({ _id: id });
    }
}
exports.MongoUserRepository = MongoUserRepository;
