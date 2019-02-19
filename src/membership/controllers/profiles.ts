import { Controller, Post, Body, Param, ParseIntPipe, Get, NotFoundException } from '@nestjs/common';
import { ClaimGuard } from '../../common/guards/claim';
import { MembershipUserProfilesService, UserWithProfiles } from '../services/profiles';

interface UserWithProfilesResponse { user: UserWithProfiles };

@Controller('memberships/:uid/profiles')
export class MembershipUserProfilesController {
  constructor(
    private readonly profiles: MembershipUserProfilesService
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard('user'))
  async add(@Param('uid', ParseIntPipe) uid: number, @Body() data: any) : Promise<UserWithProfilesResponse> {
    const user = await this.profiles.add(uid, data.id);
    if (user === undefined) throw new NotFoundException('User not found');
    return { user };
  }

  @Get()
  // @UseGuards(new ClaimGuard('user'))
  async list(@Param('uid', ParseIntPipe) uid: number) : Promise<UserWithProfilesResponse> {
    const user = await this.profiles.list(uid);
    if (user === undefined) throw new NotFoundException('User not found');
    return { user };
  }
}

export default MembershipUserProfilesController;