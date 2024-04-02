import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService:MailService){}

    @Get("/")
    test(){
       return this.mailService.sendMail("admin123456@gmail.com","Activate Account","Acticvate your account")
    }
}
