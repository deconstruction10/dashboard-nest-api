import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ username: username });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.firstname = createUserDto.firstname;
        user.lastname = createUserDto.lastname;
        user.mobile = createUserDto.mobile;
        user.userRole = createUserDto.userRole;
        const hashedPass = await this.getHash(createUserDto);
        user.password = hashedPass;
        return this.userRepository.save(user);
    }

    async getHash(createUserDto: CreateUserDto): Promise<string> {
        return bcrypt.hash(createUserDto.password, this.saltRounds);
    }

    async compareHash(
        password: string | undefined,
        hash: string | undefined,
    ): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
