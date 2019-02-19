import { Controller, Get, Request, UseGuards, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ClaimGuard } from '../../../common/guards/claim';
import { User } from '../entities/user';
import { UserFindService } from '../services/find';

interface UserResponse { user: User };

@Controller('user')
export class UserController {
  constructor(
    private readonly finder: UserFindService,
  ) {}

  @Get()
  @UseGuards(new ClaimGuard('user'))
  async current(@Request() request: any): Promise<UserResponse> {
    const session = request.user;
    if (session === undefined) throw new UnauthorizedException(); // Shouldn't happen
    const user = await this.finder.findOne(session.id); // refresh
    return { user };
  }
}

export default UserController;