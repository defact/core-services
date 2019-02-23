import { Message } from '../../entities/message';

export interface MailProvider {
  send(message: Message): Promise<void>;
}
