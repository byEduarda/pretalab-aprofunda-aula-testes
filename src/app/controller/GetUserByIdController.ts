import { Request, Response } from 'express';
import { userRepository } from '../../infra/database/repositoryInstance';

export class GetUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await userRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}