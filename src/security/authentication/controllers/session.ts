import { Controller, Delete, HttpCode } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication';

@Controller('session')
export class SessionController {
  constructor(
    private readonly authentication: AuthenticationService,
  ) {}

  @Delete()
  @HttpCode(204)
  async remove(): Promise<void> {
  }
}

export default SessionController;
