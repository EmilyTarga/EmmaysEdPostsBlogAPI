import { IUser } from 'src/user/schemas/models/user.interface';
import { UserRepository } from '../user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';

export class UserMongooseRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  getUsers(fetchAdmin: boolean): Promise<IUser[]> {
    return this.userModel.find({ IsAdmin: fetchAdmin }).skip(0).limit(10).exec();
  }

  loginUser(user: string): Promise<IUser> {
    return this.userModel.findOne({ username: user }).exec();
  }

  getUser(userId: string): Promise<IUser> {
    return this.userModel.findById(userId).exec();
  }

  async createUser(user: IUser): Promise<void> {
    const createUser = new this.userModel(user);

    await createUser.save();
  }

  async updateUser(userId: string, user: IUser): Promise<void> {
    await this.userModel
      .updateOne(
        { _id: userId },
        {
          username: user.username,
          password: user.password,
          IsAdmin: user.IsAdmin,
        },
      )
      .exec();
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }
}
