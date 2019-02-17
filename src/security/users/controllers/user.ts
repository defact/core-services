import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ClaimGuard } from '../../../common/guards/claim';
import { User } from '../entities/user';

interface UserResponse { user: User };

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(new ClaimGuard('user'))
  async current(@Request() request: any): Promise<UserResponse> {
    const user = request.user;
    return { user };
  }
}

export default UserController;