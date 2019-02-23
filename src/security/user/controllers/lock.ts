import { Controller, Post, Param, ParseIntPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../common/claim';
import { UserLockService } from '../services/lock';
import { User } from '../entities/user';

interface UserResponse { user: User; }

@Controller('users/:id/lock')
export class LockController {
  constructor(private readonly locker: UserLockService) {}

  @Post()
  @UseGuards(new ClaimGuard(Entity.User, Right.Update))
  async lock(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    const user = await this.locker.lock(id);
    if (user === undefined) { throw new NotFoundException('User not found'); }
    return { user };
  }
}

export default LockController;
