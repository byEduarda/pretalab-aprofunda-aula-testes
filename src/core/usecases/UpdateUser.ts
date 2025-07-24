import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

interface IUpdateUserInput {
  name?: string;
  login?: string;
  email?: string;
  password?: string;
}

export class UpdateUser {
    constructor(private userRepository: UserRepository){}

    async execute(id: string, data: IUpdateUserInput){
        const user = await this.userRepository.findById(id);

        if(!user){
            throw new Error('usuário não encontrado')
        }

        if(data.name) user.name = data.name;
        if(data.login) user.login = data.login;
        if(data.email) user.email = data.email;
        if(data.password) user.password = data.password;
        
        return user

    }

}
