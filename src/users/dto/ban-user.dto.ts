import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {
  @ApiProperty({
    example: "SPAM",
    description: "Ban user",
  })
  @IsString({ message: "BanReason should be a string" })
  readonly banReason : string;

  @ApiProperty({
    example: "1",
    description: "User id",
  })
  @IsNumber({},{ message: "UserId should be a number" })
  readonly userID: number;
}
