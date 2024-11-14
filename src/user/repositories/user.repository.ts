import { IUser } from '../schemas/models/user.interface';

export abstract class UserRepository {
  abstract getUser(userId: string): Promise<IUser>;
  abstract getUsers(fetchAdmin: boolean): Promise<IUser[]>;
  abstract loginUser(user: string): Promise<IUser>;
  abstract createUser(user: IUser): Promise<void>;
  abstract updateUser(userId: string, user: IUser): Promise<void>;
  abstract deleteUser(userId: string): Promise<void>;
}
