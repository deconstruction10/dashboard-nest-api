import {RolesBuilder} from "nest-access-control";
import {User} from "../../users/entities/user.entity";

export enum AppRoles {
    User = 'User',
    Admin = 'Admin'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    .grant(AppRoles.User)
    .createOwn('profile')
    .deleteOwn('profile')
    .updateOwn('profile')
    .readOwn('profile')

    .grant(AppRoles.Admin)
    .extend(AppRoles.User)
    .updateAny('profile', [typeof User])
    .deleteAny('profile', [typeof User])
    .readAny('profile')

