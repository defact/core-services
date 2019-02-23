import { Controller, Get, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../common/claim';
import { User } from '../entities/user';
import { UserFindService } from '../services/find';

interface UserResponse { user: User; }

@Controller('user')
export class UserController {
  constructor(
    private readonly finder: UserFindService,
  ) {}

  @Get()
  @UseGuards(new ClaimGuard(Entity.User))
  async current(@Request() request: any): Promise<UserResponse> {
    const session = request.user;
    if (session === undefined) { throw new UnauthorizedException(); } // Shouldn't happen
    const user = await this.finder.findOne(session.id); // refresh
    return { user };
  }
}

export default UserController;
