import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    async sendMail(to:string, from:string, data:string){
        //send mail
        return;
    }
}
