import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  IsAdmin: z.boolean(),
});

type User = z.infer<typeof userSchema>;

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Login = z.infer<typeof loginSchema>;

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async loginUser(@Body() { username, password }: Login) {
    const userFound = await this.userService.loginUser(username);

    const doesntPasswordMatch = await compare(password, userFound.password);

    if (!doesntPasswordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: userFound.id, username: userFound.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      username: userFound.username,
      IsAdmin: userFound.IsAdmin,
    };
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @UsePipes(new ZodValidationPipe(userSchema))
  @Post()
  async createUser(@Body() { username, password, IsAdmin }: User) {
    const hashedPassword = await hash(password, 8);
    const userWithHashedPassword = {
      username,
      password: hashedPassword,
      IsAdmin,
    };

    return this.userService.createUser(userWithHashedPassword);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() { username, password, IsAdmin }: User,
  ) {
    return this.userService.updateUser(userId, {
      username,
      password,
      IsAdmin,
    });
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
