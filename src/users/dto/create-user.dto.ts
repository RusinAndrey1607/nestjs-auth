import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserRegistrationDto } from "src/auth/dto/user-registration.dto";

export class CreateUserDto  extends UserRegistrationDto{
  @ApiProperty({
    example: "b0fc9ffd-816b-42fc-b7de-9291ad8be01d ",
    description: "Activation link",
  })
  @IsString({ message: "ActivationLink should be a string" })
  readonly activationLink: string;
}
