import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRegistrationDto } from "./dto/user-registration.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Login" })
  @Post("/login")
  login(@Body() userDto: UserRegistrationDto) {
    return this.authService.login(userDto);
  }
  @ApiOperation({ summary: "Registation" })
  @Post("/registration")
  registration(@Body() userDto: UserRegistrationDto) {
    return this.authService.registration(userDto);
  }
}
