import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../posts.module';

export const database = process.env.MONGO_URI;

export const imports = [MongooseModule.forRoot(database), PostsModule];
