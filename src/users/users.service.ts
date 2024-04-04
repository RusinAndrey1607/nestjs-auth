import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private rolesService: RolesService,
  ) {}

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({
      where: {
        activationLink,
      },
    });
    if (!user) {
      throw new HttpException(
        'Invalid activation link',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.isActivated = true;
    await user.save();
    return user;
  }
  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    const role = await this.rolesService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
  async createAdmin(dto: CreateUserDto) {
    try {
      const user = await this.userModel.create(dto);
      const role = await this.rolesService.getRoleByValue('ADMIN');
      await user.$set('roles', [role.id]);
      user.isActivated = true;
      await user.save();
      user.roles = [role];
      return user;
    } catch (error) {
      throw new HttpException('Admin already exists', HttpStatus.BAD_REQUEST);
    }
  }
  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userID);
    const role = await this.rolesService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or Role not Found', HttpStatus.NOT_FOUND);
  }
  async banUser(dto: BanUserDto) {
    const user = await this.userModel.findByPk(dto.userID);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
  }
  async getAllUsers() {
    const users = await this.userModel.findAll({
      include: { all: true },
    });
    return users;
  }
  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
      include: {
        all: true,
      },
    });
    return user;
  }
}
