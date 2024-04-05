import { Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model ";
import { AuthModule } from './auth/auth.module';
import { InitializationModule } from './initialization/initialization.module';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  controllers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User,Role,UserRoles],
      autoLoadModels: true,
      
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    InitializationModule,
    MailModule,
    FilesModule,
  ],
  providers: [],
})
export class AppModule {}
