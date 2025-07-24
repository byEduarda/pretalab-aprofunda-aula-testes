import { Request, Response } from 'express';
import { DeleteUser } from "../../core/usecases/DeleteUser";
import { userRepository } from '../../infra/database/repositoryInstance';

export class DeleteUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; 
    const deleteUser = new DeleteUser(userRepository);
    try {
      if (!id) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      await deleteUser.execute(id);
       
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}