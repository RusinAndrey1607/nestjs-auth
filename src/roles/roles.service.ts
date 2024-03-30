import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    try {
      const role = await this.roleModel.create(dto);
      return role;
    } catch (error) {
      throw new HttpException("Role already exists",HttpStatus.BAD_REQUEST)
    }
   
  }
  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({
      where: {
        value,
      },
    });
    return role;
  }
}
