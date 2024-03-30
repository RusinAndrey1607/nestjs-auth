import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { InitializationService } from './initialization.service';

@Module({
    imports:[UsersModule,RolesModule],
    controllers:[],
    providers:[InitializationService]
})
export class InitializationModule {}
