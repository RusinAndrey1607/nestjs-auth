import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService,) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Role creation" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: "Get role by value" })
  @ApiResponse({ status: 200, type: Role })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
