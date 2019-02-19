import { Controller, Post, Body, Param, ParseIntPipe, Get, NotFoundException } from '@nestjs/common';
import { ClaimGuard } from '../../common/guards/claim';
import { MembershipProfileUsersService, ProfileWithUsers } from '../services/users';

interface ProfileWithUsersResponse { profile: ProfileWithUsers };

@Controller('memberships/:pid/users')
export class MembershipProfileUsersController {
  constructor(
    private readonly users: MembershipProfileUsersService
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard('membership'))
  async add(@Param('pid', ParseIntPipe) uid: number, @Body() data: any) : Promise<ProfileWithUsersResponse> {
    const profile = await this.users.add(uid, data.id);
    if (profile === undefined) throw new NotFoundException('Profile not found');
    return { profile };
  }

  @Get()
  // @UseGuards(new ClaimGuard('membership'))
  async list(@Param('pid', ParseIntPipe) pid: number) : Promise<ProfileWithUsersResponse> {
    const profile = await this.users.list(pid);
    if (profile === undefined) throw new NotFoundException('Profile not found');
    return { profile };
  }
}

export default MembershipProfileUsersController;