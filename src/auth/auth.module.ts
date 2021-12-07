import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule, JwtSecretRequestType} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {AppService} from "../app.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {FirebaseStrategy} from "./strategy/firebase-strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,

  ],
  controllers: [AuthController],
  providers: [AuthService, AppService, FirebaseStrategy],
  exports: []
})
export class AuthModule {}
