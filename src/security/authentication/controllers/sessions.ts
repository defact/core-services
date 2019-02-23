import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication';
import { Session } from '../interfaces/session';

interface SessionResponse { token: string; }

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly authentication: AuthenticationService,
  ) {}

  @Post()
  async create(@Body() data: Session): Promise<SessionResponse> {
    const token = await this.authentication.signOn(data);

    return { token };
  }
}

export default SessionsController;
