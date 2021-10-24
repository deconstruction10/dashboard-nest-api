import { Injectable } from '@nestjs/common';
import {InjectRolesBuilder, RolesBuilder} from "nest-access-control";
import {User} from "../users/entities/user.entity";

@Injectable()
export class RolesService {
  constructor(@InjectRolesBuilder() private readonly role: RolesBuilder) {}

  createProfileUser(user: User) {
    this.role.allow({role: typeof user});
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: any) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
