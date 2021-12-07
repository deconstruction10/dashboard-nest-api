import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtModuleOptions, JwtOptionsFactory, JwtService, JwtSignOptions} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {UserDto} from "../users/dto/user.dto";
import {auth} from "firebase-admin";

@Injectable()
export class AuthService  implements JwtOptionsFactory{
    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {
            secret: 'secret'
        }
    }

    constructor(
      private readonly jwt: JwtService,
      private readonly userService: UsersService) {
  }

    async createToken(id: string, username: string, userRole: string) {
        const expiresIn = 60 * 60;
        const privateKey = 'secret';
        const user = { username, userRole};
        const token = this.jwt.sign(user, { expiresIn, privateKey });

        return { expires_in: expiresIn, token };
    }

    async validateUser(signedUser: { username: string; }): Promise<boolean> {
        if (signedUser && signedUser.username) {
            return Boolean(this.userService.getUserByUsername(signedUser.username));
        }
        return false;
    }

    login(payload: {
        userId: UserDto, username: UserDto, email: UserDto, password: UserDto, firstname: UserDto,
        lastname: UserDto, emailVerified: UserDto, mobile: UserDto, token: UserDto, userRole: UserDto
    }, options?: JwtSignOptions) {
      return this.jwt.signAsync(payload, options);
    }

    async validateAuthFire(user: UserDto) {
        return auth()
            .verifyIdToken(user.token, true)
            .catch((err: Error) => {
                throw  new UnauthorizedException();
            })
    }
}
