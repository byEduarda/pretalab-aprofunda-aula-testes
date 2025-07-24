import { User } from "../../core/entities/User";
import { UserRepository } from "../../core/repositories/UserRepository";
import { userModel } from "../database/mongooseUserModel";

export class MongoUserRepository implements UserRepository {
  private toEntity(doc: any): User {
    return new User(doc.name, doc.login, doc.email, doc.password, doc._id.toString());
  }

  async save(user: User): Promise<User> {
    const doc = await userModel.create(user);
  return this.toEntity(doc)

  }

  async findByEmail(email: string) {
    const doc = await userModel.findOne({ email });

    return doc ? this.toEntity(doc) : null;
  }

  async findById(id: string) {
    const doc = await userModel.findOne({ _id: id });

    return doc ? this.toEntity(doc) : null;
  }

  async update(user: User) {
    const doc = await userModel.findByIdAndUpdate(
      user.id,
      {
        name: user.name,
        login: user.login,
        email: user.email,
        password: user.password,
      },
      { new: true }
    );
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string) {
      await userModel.findOneAndDelete({_id: id});
  }
}