import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    example: "ADMIN",
    description: "Role Value",
  })
  @IsString({ message: "Value should be a string" })
  readonly value: string;

  @ApiProperty({
    example: "Admin role",
    description: "Role description",
  })
  @IsString({ message: "Description should be a string" })
  readonly description: string;
}
