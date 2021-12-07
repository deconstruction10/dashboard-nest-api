import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
      // FirebaseAdminModule.forRootAsync({
      //     useFactory: () => ({
      //         credential: admin.credential.cert({
      //             projectId: service.project_id,
      //             clientEmail: service.client_email,
      //             privateKey: service.private_key.replace(/\\n/g, '\n'),
      //         }),
      //         databaseURL: service.database_url,
      //         serviceAccountId: service.client_id,
      //     })
      // }),

  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
