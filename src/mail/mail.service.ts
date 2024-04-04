import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}
    async sendMail(to:string, subject:string,text:string){
        this.mailerService.sendMail({
            to,
            from:process.env.SMTP_USER,
            subject,
            text,
            html:`<a href="${text}">${text}</a>`,
        })
        return "hello";
    }
}
