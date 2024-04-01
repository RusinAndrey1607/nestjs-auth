import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}
    async sendMail(to:string, from:string, subject:string,text:string){
        this.mailerService.sendMail({
            to,
            from,
            subject,
            text,
            html:`<h1>Hello test message</h1>`,
        })
        return;
    }
}
