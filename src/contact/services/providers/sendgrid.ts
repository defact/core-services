import * as sendgrid from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../../configuration/service';
import { Message } from '../../entities/message';

@Injectable()
export class SendGridMailer {
  constructor(private readonly config: ConfigurationService) {
    sendgrid.setApiKey(this.config.get('sendgrid:apikey'));
  }

  async send(data: Message): Promise<void> {
    const mail = {
      from: data.from,
      to: this.config.get('mail:sendto'),
      subject: data.subject,
      text: data.message,
    };

    sendgrid.send(mail);
  }
}

export default SendGridMailer;
