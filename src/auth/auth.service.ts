import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import {AppRoles} from "../roles/roles/app.roles";

@Injectable()
export class AuthService {
  constructor(
      private readonly jwt: JwtService,
      private readonly userService: UsersService) {
  }

    async createToken(id: number, username: string, userRole: string) {
        const expiresIn = 60 * 60;
        const privateKey = 'secret';
        const user = { username, userRole};
        const token = this.jwt.sign(user, { expiresIn, privateKey });

        return { expires_in: expiresIn, token };
    }

    async validateUser(signedUser): Promise<boolean> {
        if (signedUser && signedUser.username) {
            return Boolean(this.userService.getUserByUsername(signedUser.username));
        }

        return false;
    }
}
