import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { TypeResponse } from '../../interfaces/types';
import User from '../../database/models/User';

const SECRET_KEY = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  private static async getUsers() {
    return User.findAll();
  }

  public static async getByEmailAndPassword(email: string, password: string):
  Promise<TypeResponse> {
    const users = await UserService.getUsers();
    const hasPassword = users.some((usr) => bcrypt.compareSync(password, usr.password)); // Refatorar essa lógica
    const userThatHasEmail = await User.findOne({
      where: { email },
    });

    if (!userThatHasEmail || !hasPassword) {
      console.log(userThatHasEmail, hasPassword);
      return { type: 401, message: 'Invalid email or password' };
    }

    return { message: jwt.sign({
      id: userThatHasEmail.id,
      username: userThatHasEmail.username,
      email: userThatHasEmail.email,
    }, SECRET_KEY) };
  }

  public static async getById(id: number): Promise<TypeResponse> {
    const response = await User.findByPk(id);
    if (!response) return { type: 500, message: 'Has not possible to get role' };
    return { message: response.role };
  }
}
