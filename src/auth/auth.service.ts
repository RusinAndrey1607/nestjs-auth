import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { UserRegistrationDto } from "./dto/user-registration.dto";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "src/users/users.model";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService:MailService
  ) {}
  async login(dto: UserRegistrationDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }
  async registration(dto: UserRegistrationDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        `User with ${dto.email} already exists`,
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const activationLink = await uuidv4();
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
      activationLink,
    });
    // console.log("Sent email activationLink");
    await this.mailService.sendMail(dto.email,"Activate your account",`${process.env.API_URL}/users/activate/${activationLink}`)
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(dto: UserRegistrationDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if(!user){
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password)
    if (user && passwordEquals){
        return user;
    }
    throw new UnauthorizedException({ message: `Incorrect email or password` });

  }
}
