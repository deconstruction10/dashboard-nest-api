import { Module } from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DbModule} from './db/db.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {RolesModule} from './roles/roles.module';
import {FirebaseModule} from "nestjs-firebase";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DbModule,
    UsersModule,
    AuthModule,
    RolesModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: __dirname + '\\serviceAccountKey.json'
    }),
  ],
  controllers: [AppController],
  providers: [AppService,],
  exports: [AppService],
})
export class AppModule{
}
