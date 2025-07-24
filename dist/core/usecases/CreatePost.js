"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePost = void 0;
class CreatePost {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async execute(post) {
        await this.postRepo.save(post);
    }
}
exports.CreatePost = CreatePost;
