import { Injectable, Global } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message';
import { MailProvider } from './providers/provider';
import { SendGridMailer } from './providers/sendgrid';
import { ConsoleMailer } from './providers/console';
import { ConfigurationService } from '../../configuration/service';

@Injectable()
export class SendMailService {
  private sender: MailProvider;

  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
    private readonly sendgrid: SendGridMailer,
    private readonly console: ConsoleMailer,
    private readonly config: ConfigurationService,
  ) {
    const provider = this.config.get('providers:mail');

    this.sender = {
      sendgrid: this.sendgrid,
      console: this.console,
    }[provider];
  }

  async send(data: Message): Promise<Message> {
    data.sentAt = new Date;

    if (data.to === undefined) data.to = this.config.get('mail:sender');

    console.log(data);

    try {
      await this.sender.send(data);
    } catch (err) {
      //
    }
    return await this.repository.save(data);
  }
}

export default SendMailService;
