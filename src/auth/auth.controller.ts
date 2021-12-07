import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  HttpStatus,
  Request, UseGuards, Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserDto} from "../users/dto/user.dto";
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {AppService} from "../app.service";
import {AuthFirebaseUser} from "../users/interfaces/authFIrebaseUser";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService,
      private readonly appService: AppService) {}

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
    type: UserDto
  })
  async register(@Body() user: UserDto): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Post('oauth/google')
  async authFirebase(@Body() user: UserDto, authFirebaseUser: AuthFirebaseUser) {
    console.log(user)
    return this.appService.authGoogle(user, authFirebaseUser);
  }

  // @Get('verify-email')
  // @UseGuards(JwtAuthGuard)
  // async verifyEmail(@Request() req: UserDto) {
  //   console.log(req.username);
  //  await this.appService.verifyEmail(req.username, req.email);
  // }

  @Post('user')
  async authFire(@Body('user') user: UserDto, @Request() token: UserDto) {
    await this.authService.validateAuthFire(user);
  }
}
