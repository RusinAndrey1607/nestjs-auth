import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { User } from './users.model';
import { UserRoles } from 'src/roles/user-roles.model ';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
    imports: [SequelizeModule.forFeature([Role, User, UserRoles]),RolesModule],
    controllers:[UsersController],
    providers:[UsersService]
})
export class UsersModule {}
