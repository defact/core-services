import { Injectable } from '@nestjs/common';
import { User } from '../../security/user/entities/user';
import { SendMailService } from '../../contact/services/send';
import { Message } from '../../contact/entities/message';
import ConfigurationService from '../../configuration/service';

@Injectable()
export class EmailRegistrationService {
  constructor(
    private readonly sender: SendMailService,
    private readonly config: ConfigurationService,
  ) {}

  async send(user: User): Promise<void> {
    const message: Message = {
      to: user.email,
      from: this.config.get('mail:sender'),
      subject: 'Member',
      message: 'Text',
    };

    await this.sender.send(message);
  }
}

export default EmailRegistrationService;
