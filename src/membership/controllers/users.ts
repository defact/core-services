import { Controller, Post, Body, Param, ParseIntPipe, Get, NotFoundException } from '@nestjs/common';
import { ClaimGuard } from '../../common/guards/claim';
import { MembershipProfileUsersService, ProfileWithUsers } from '../services/users';

interface MemberResponse { member: ProfileWithUsers };

@Controller('memberships/:pid/users')
export class MembershipProfileUsersController {
  constructor(
    private readonly users: MembershipProfileUsersService
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard('membership'))
  async add(@Param('pid', ParseIntPipe) uid: number, @Body() data: any) : Promise<MemberResponse> {
    const member = await this.users.add(uid, data.id);
    if (member === undefined) throw new NotFoundException('Member not found');
    return { member };
  }

  @Get()
  // @UseGuards(new ClaimGuard('membership'))
  async list(@Param('pid', ParseIntPipe) pid: number) : Promise<MemberResponse> {
    const member = await this.users.list(pid);
    if (member === undefined) throw new NotFoundException('Member not found');
    return { member };
  }
}

export default MembershipProfileUsersController;