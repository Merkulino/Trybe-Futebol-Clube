import { Request, Response } from 'express';
import UserService from '../service/user.service';

export default class TeamsController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { type, message } = await UserService.getByEmailAndPassword(email, password);
    if (type) return res.status(type).json({ message });
    return res.status(200).json({ token: message });
  }

  static async getRole(req: Request, res: Response) {
    const { currentUser } = req.body;
    const { type, message } = await UserService.getById(currentUser.id);
    if (type) return res.status(type).json({ message });
    return res.status(200).send({ role: message });
  }
}
