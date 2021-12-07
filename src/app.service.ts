import {Injectable} from '@nestjs/common';
import {FirebaseAdmin, InjectFirebaseAdmin} from "nestjs-firebase";
import {User} from "./users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {AuthFirebaseUser} from "./users/interfaces/authFIrebaseUser";
import {UserDto} from "./users/dto/user.dto";
import {auth} from "firebase-admin";
import UserRecord = auth.UserRecord;
import {DecodedIdToken} from "firebase-admin/lib/auth";

@Injectable()
export class AppService {
  constructor(
     @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async authGoogle(user: UserDto, authFirebaseUser: AuthFirebaseUser): Promise<UserDto & AuthFirebaseUser & User> {
        const authUser = await this.firebase.auth.createUser({
            uid: user.id,
            displayName: user.username + user.firstname + user.lastname,
            email: user.email,
            password: user.password,
            emailVerified: user.emailVerified,
            phoneNumber: String(user.mobile),
        })
        const newUser = Object.assign(user, authFirebaseUser);
        return await this.userRepository.save(newUser);
   }

   async removeUser(user: User) {
     return await this.firebase.auth.deleteUser(user.id);
   }

   async updateUserProperties(user: User) {
      return await this.firebase.auth.updateUser(user.password, user);
   }

   // async verifyEmail(username: string, email: string) {
   //    const user: User = await this.userRepository.findOne({where: {username: username}});
   //    await this.firebase.auth.verifyIdToken(token, true)
   //        .then(async (value: DecodedIdToken) => {
   //            if (value !== null) {
   //                await this.firebase.auth.generateEmailVerificationLink(email, {url: 'http://localhost/3000/auth/verify-email'})
   //            }
   //        })
   //        .catch((err: Error) => {
   //            return err;
   //        })
   // };

    async getUsers(id: UserDto): Promise<User[]> {
        return this.userRepository.find({relations: ['id']});
    }

   async resetPassword(password: string): Promise<string> {
       return await this.firebase.auth.generatePasswordResetLink(password, {url: 'http://localhost/3000/auth/reset-password'});
   };

   async findUser(username: UserDto, user: UserDto): Promise<UserRecord | User[]> {
       return await this.firebase.auth.getUser(user.username);
   }

   //  async refreshToken(user: UserDto): Promise<UpdateResult> {
   //   return await this.userRepository.update(user);
   // }

   async changePassword(user: UserDto) {
       return await this.firebase.auth.updateUser(user.id, user);
   }
}
