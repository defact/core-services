import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationService } from '../../configuration/service';
import { Message } from '../entities/message';
import { MailProvider } from './providers/provider';
import { SendGridMailer } from './providers/sendgrid';

@Injectable()
export class SendMailService {
  private sender: MailProvider;

  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
    private readonly config: ConfigurationService,
    private readonly sendgrid: SendGridMailer,
  ) {
    const provider = config.get('providers:mail');

    this.sender = {
      sendgrid: this.sendgrid
    }[provider];
  }
  
  async send(data: Message): Promise<Message> {
    data.sentAt = new Date;

    try {
      await this.sender.send(data);
    } catch(err) {

    }
    return await this.repository.save(data);
  }
}

export default SendMailService;