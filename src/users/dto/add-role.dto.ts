import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({
    example: "ADMIN",
    description: "Admin role",
  })
  @IsString({ message: "Value should be a string"})
  readonly value: string;
  
  @ApiProperty({
    example: "1",
    description: "User id",
  })
  @IsNumber({},{ message: "UserId should be a number" })
  readonly userID: number;
}
