import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';

@Module({
  providers: [MailService],
  imports:[
    MailerModule.forRoot({
      transport:{
        secure:false,
        port: 587,
        host:'smtp.yandex.ru',
        auth:{
          user:process.env.SMTP_USER || "",
          pass:process.env.SMTP_PASSWORD || ""
        }
      }
    })
  ],
  exports:[MailService],
  controllers: [MailController]
})
export class MailModule {}
