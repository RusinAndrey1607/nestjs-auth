import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [MailService],
  imports:[
    MailerModule.forRoot({
      transport:{
        host:process.env.SMTP_HOST,
        auth:{
          user:process.env.SMTP_USER,
          pass:process.env.SMTP_PASSWORD
        }
      }
    })
  ],
  exports:[MailService]
})
export class MailModule {}
