import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnectionOptions} from "typeorm";
import {User} from "../users/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                }),
        }),
        TypeOrmModule.forFeature([User])
    ]
})
export class DbModule {}
