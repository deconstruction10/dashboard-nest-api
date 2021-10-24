import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length, IsNotEmpty} from 'class-validator';
import {AppRoles} from "../../roles/roles/app.roles";

export class CreateUserDto {
    @ApiProperty({name: 'id', type: 'int', maxLength: 36, nullable: false})
    id: number;

    @ApiProperty({name: 'username', type: 'varchar', maxLength: 45})
    @Length(1, 45)
    username: string;

    @ApiProperty({name: 'email', type: 'varchar', maxLength: 45})
    @IsEmail()
    @Length(1,45)
    email: string;

    @ApiProperty({name: 'password', type: 'varchar', maxLength: 45})
    @Length(1, 45)
    password: string;

    @ApiProperty({name: 'firstname', type: 'varchar', maxLength: 45})
    @Length(1, 45)
    firstname: string;

    @ApiProperty({name: 'lastname', type: 'varchar', maxLength: 45})
    @Length(1, 45)
    lastname: string;

    @ApiProperty({name: 'mobile', type: 'int', maxLength: 45})
    @Length(1, 45)
    mobile: number;

    @ApiProperty({name: 'userRole', type: 'varchar', maxLength: 50})
    userRole: AppRoles;
}
