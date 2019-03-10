import { Controller, Put, Param, ParseIntPipe, UseGuards, NotFoundException, HttpCode } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../common/claim';
import { VerificationCodeService } from '../services/code';
import { User } from '../entities/user';

interface UserResponse { user: User; }

@Controller('users/:id/code')
export class VerificationCodeController {
  constructor(private readonly code: VerificationCodeService) {}

  @Put()
  @HttpCode(204)
  @UseGuards(new ClaimGuard(Entity.User, Right.Update))
  async reset(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const user = await this.code.reset(id);
    if (user === undefined) { throw new NotFoundException('User not found'); }
  }
}

export default VerificationCodeController;
