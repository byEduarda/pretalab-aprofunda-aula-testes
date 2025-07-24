"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllwithUser = void 0;
class GetAllwithUser {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute() {
        return this.postRepository.getAllWithUser();
    }
}
exports.GetAllwithUser = GetAllwithUser;
