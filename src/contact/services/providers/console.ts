import { Injectable } from '@nestjs/common';
import { Message } from '../../entities/message';

@Injectable()
export class ConsoleMailer {
  async send(data: Message): Promise<void> {
    const mail = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.message,
    };

    console.log(mail);
  }
}

export default ConsoleMailer;
