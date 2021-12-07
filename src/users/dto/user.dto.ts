import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length, IsNotEmpty} from 'class-validator';
import {AppRoles} from "../../roles/roles/app.roles";

export class UserDto {
    @ApiProperty({name: 'id', type: 'varchar', maxLength: 36, nullable: false, format: 'uuid'})
    id: string;

    @ApiProperty({name: 'username', type: 'varchar', maxLength: 50})
    @Length(1, 45)
    username: string;

    @ApiProperty({name: 'email', type: 'varchar', maxLength: 50})
    @IsEmail()
    @Length(1,45)
    email: string;

    @ApiProperty({name: 'password', type: 'varchar', maxLength: 100})
    @Length(1, 45)
    password: string;

    @ApiProperty({name: 'firstname', type: 'varchar', maxLength: 50})
    @Length(1, 45)
    firstname: string;

    @ApiProperty({name: 'lastname', type: 'varchar', maxLength: 50})
    @Length(1, 45)
    lastname: string;

    @ApiProperty({name: 'emailVerified', type: 'boolean'})
    emailVerified: boolean;

    @ApiProperty({name: 'mobile', type: 'varchar', maxLength: 45})
    mobile: string;

    @ApiProperty({name: 'token', type: 'varchar', uniqueItems: true})
    token: string;

    @ApiProperty({name: 'userRole', type: 'varchar', maxLength: 50})
    userRole: AppRoles;
}
