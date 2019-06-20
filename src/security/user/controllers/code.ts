import { Controller, Post, Param, HttpCode } from '@nestjs/common';
import { VerificationCodeService } from '../services/code';

@Controller('users/:email/code')
export class VerificationCodeController {
  constructor(private readonly code: VerificationCodeService) {}

  @Post()
  @HttpCode(204)
  async reset(@Param('email') email: string): Promise<void> {
    await this.code.reset(email);
  }
}

export default VerificationCodeController;
