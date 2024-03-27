import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model ';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
    imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
    exports:[RolesService],
    controllers:[RolesController],
    providers:[RolesService]

})
export class RolesModule {}
