import { Injectable } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import {hash} from "bcryptjs";

@Injectable()
export class InitializationService {
    constructor(
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService,
      ) {}
    
      async onModuleInit() {
        await this.createRoles();
        await this.createAdminUser();
      }
    
      private async createRoles() {
        const admin = this.rolesService.getRoleByValue("ADMIN")
        if(!admin){
          await this.rolesService.createRole({value:'ADMIN',description:"Admin can do whatever he wants"});
        }
        const user =  this.rolesService.getRoleByValue("USER")
        if (!user){
          await this.rolesService.createRole({value:'USER',description:"USER role"});
        }
       return;

      }
    
      private async createAdminUser() {
        const adminExist = await this.usersService.getUserByEmail(process.env.ADMIN_EMAIL)
        if (!adminExist){
          await this.usersService.createAdmin({
            email:process.env.ADMIN_EMAIL,
            password:await hash(process.env.ADMIN_PASSWORD,5),
            activationLink:""
        });
        }
       return;
      }
}
