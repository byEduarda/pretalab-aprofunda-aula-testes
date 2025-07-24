import { Request, Response } from 'express';
import { userRepository } from '../../infra/database/repositoryInstance';
import { UpdateUser } from '../../core/usecases/UpdateUser';

export class UpdateUserByController{
      async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { name, login, email, password } = req.body;
    
        try {
          const updateUser = await userRepository.update({id, name, login, email, password})
    
           res.json(updateUser);
            return res.status(201).json({
              message: 'Usuário atualizado com sucesso',
              user: updateUser
            });
        } catch (error: any) {
           return res.status(404).json({ error: error.message });
        }
      }
}