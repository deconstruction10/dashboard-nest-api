import {Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {ServerResponse} from "http";


@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService) {}

  @Post('login')
  @ApiCreatedResponse({
    status: 200,
    description: 'User has been successfully logged in',
  })
  async loginUser(@Response() res: any, @Body() body: User) {
    if (!(body && body.username && body.password)) {
      return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Username and password are required!' });
    }
    const user = await this.usersService.getUserByUsername(body.username);

    if (user) {
      if (await this.usersService.compareHash(body.password, user.password)) {
        return res
            .status(HttpStatus.OK)
            .json(await this.authService.createToken(user.id, user.username, user.userRole));
      }
    }
    return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Username or password wrong!' });
  }

  @Post('register')
  @ApiCreatedResponse({
    status: 201,
    description: 'User has been successfully created',
    type: CreateUserDto
  })
  async register(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return await this.usersService.createUser(user);
  }
}
