import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UserRegistrationDto {
  @ApiProperty({
    example: "user@mail.com",
    description: "Email",
  })
  @IsString({ message: "Email should be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @ApiProperty({
    example: "b0fc9ffd-816b-42fc-b7de-9291ad8be01d ",
    description: "Password",
  })
  @IsString({ message: "Password should be a string" })
  @Length(4, 32, {
    message: "Password should be at least 4 characters but no longer than 32!",
  })
  readonly password: string;

}
