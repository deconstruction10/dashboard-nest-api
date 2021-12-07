import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {AppRoles} from "../../roles/roles/app.roles";

@Entity('user')
export class User {
    @ApiProperty({name: 'id', type: 'uuid'})
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @ApiProperty({name: 'username', type: 'varchar', maxLength: 50, nullable: true})
    @Column({name: 'username', type: 'varchar', length: 50, nullable: true})
    username: string;

    @ApiProperty({name: 'email', type: 'varchar',maxLength: 50, nullable: true})
    @Column({name: 'email', type: 'varchar',length: 50, nullable: true})
    email: string;

    @ApiProperty({name: 'password', type: 'varchar', maxLength: 100, nullable: true})
    @Column({name: 'password', type: 'varchar', length: 100, nullable: true})
    password: string;

    @ApiProperty({name: 'firstname', type: 'varchar', nullable: true, maxLength: 50})
    @Column({name: 'firstname', type: 'varchar', length: 50, nullable: true})
    firstname: string;

    @ApiProperty({name: 'lastname', type: 'varchar', maxLength: 50, nullable: true})
    @Column({name: 'lastname', type: 'varchar', length: 50, nullable: true})
    lastname: string;

    @Column({name: 'emailVerified', type: "boolean", nullable: true})
    emailVerified: boolean;

    @ApiProperty({name: 'mobile', type: 'varchar', nullable: true})
    @Column({name: 'mobile', type: 'varchar', nullable: true})
    mobile: string;

    @ApiProperty({name: 'token', type: 'varchar', uniqueItems: true})
    @Column({name: 'token', type: 'varchar', nullable: true, unique: true})
    token: string;

    @Column({name: 'userRole', type: 'enum', enum: AppRoles, enumName: 'userRole', default: AppRoles.User})
    userRole: AppRoles;
}




