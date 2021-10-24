import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {AccessControlModule} from "nest-access-control";
import {roles} from "./roles/app.roles";

@Module({
  imports: [AccessControlModule.forRoles(roles)],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
