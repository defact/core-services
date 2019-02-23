import { Controller, Post, Body } from '@nestjs/common';
import { SendMailService } from '../services/send';
import { Message } from '../entities/message';

interface MessageResponse { message: Message; }

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly sender: SendMailService,
  ) {}

  @Post()
  async create(@Body() data: Message): Promise<MessageResponse> {
    const message = await this.sender.send(data);
    return { message };
  }
}

export default MessagesController;
