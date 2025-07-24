"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }
    async save(user) {
        const existingIndex = this.users.findIndex(u => u.id === user.id);
        if (existingIndex >= 0) {
            this.users[existingIndex] = user;
            return this.users[existingIndex];
        }
        else {
            this.users.push(user);
            return user;
        }
    }
    async findByEmail(email) {
        const user = this.users.find((u) => u.email === email);
        return user || null;
    }
    async findById(id) {
        const user = this.users.find((u) => u.id === id);
        return user || null;
    }
    async findByLogin(login) {
        const user = this.users.find((u) => u.login === login);
        return user || null;
    }
    async update(id, userData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return null;
        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        return this.users[userIndex];
    }
    async delete(id) {
        this.users = this.users.filter((user) => user.id !== id);
    }
    async getAll() {
        return [...this.users];
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
