import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user.module';

export const database = process.env.MONGO_URI;

export const imports = [MongooseModule.forRoot(database), UserModule];
