import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "src/roles/roles-auth.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @UsePipes() 
  @ApiOperation({ summary: "Activate user" })
  @ApiResponse({ status: 200, type:User })
  @Get("/activate/:link")
  activate(@Param("link") link:string) {
    return this.usersService.activate(link);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Give out the role" })
  @ApiResponse({ status: 200 })
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({
    summary: 'Ban user',
  })
  @ApiResponse({ status: 200, type: User})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }
}
