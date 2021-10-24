import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {AppRoles} from "../../roles/roles/app.roles";
import {UseRoles} from "nest-access-control";

@Entity('user')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn({name: 'id', type: 'int'})
    id: number;

    @ApiProperty()
    @Column({name: 'username', type: 'varchar', length: 1000})
    username: string;

    @ApiProperty()
    @Column({name: 'email', type: 'varchar',length: 1000})
    email: string;

    @ApiProperty()
    @Column({name: 'password', type: 'varchar', length: 1000})
    password: string;

    @ApiProperty()
    @Column({name: 'firstname', type: 'varchar', length: 1000})
    firstname: string;

    @ApiProperty()
    @Column({name: 'lastname', type: 'varchar', length: 1000})
    lastname: string;

    @ApiProperty()
    @Column({name: 'mobile', type: 'bigint'})
    mobile: number;

    @Column({name: 'userRole', type: 'enum', enum: AppRoles, enumName: 'userRole', default: AppRoles.User})
    userRole: AppRoles;
}




