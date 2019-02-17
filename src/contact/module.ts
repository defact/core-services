import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './controllers/messages';
import { SendMailService } from './services/send';
import { Message } from './entities/message';
import { SendGridMailer } from './services/providers/sendgrid';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [
    MessagesController, 
  ],
  providers: [
    SendMailService, 
    SendGridMailer,
  ],
  exports: [
    SendMailService,
  ]
})
export class ContactModule {}