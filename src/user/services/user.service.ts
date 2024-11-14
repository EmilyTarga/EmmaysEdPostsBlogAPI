import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../schemas/models/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async loginUser(username: string): Promise<IUser> {
    const user = await this.userRepository.loginUser(username);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async getUser(userId: string): Promise<IUser> {
    const user = await this.userRepository.getUser(userId);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async getUsers(fetchAdmin: boolean): Promise<IUser[]> {
    const users = await this.userRepository.getUsers(fetchAdmin);
    return users;
  }

  async createUser(user: IUser): Promise<void> {
    return this.userRepository.createUser(user);
  }

  async updateUser(userId: string, user: IUser): Promise<void> {
    return this.userRepository.updateUser(userId, user);
  }

  async deleteUser(userId: string): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
