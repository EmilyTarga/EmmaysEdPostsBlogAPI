import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from './models/user.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  id?: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  IsAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
