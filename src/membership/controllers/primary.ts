import { Controller, Put, Body, Param, ParseIntPipe, Get, NotFoundException } from '@nestjs/common';
import { ClaimGuard } from '../../common/guards/claim';
import { MembershipUserProfilesService, UserWithProfiles } from '../services/profiles';

interface MemberResponse { member: UserWithProfiles };

@Controller('memberships/:uid/profiles/primary')
export class MembershipPrimaryProfileController {
  constructor(
    private readonly profiles: MembershipUserProfilesService
  ) {}

  @Put()
  // @UseGuards(new ClaimGuard('user'))
  async set(@Param('uid', ParseIntPipe) uid: number, @Body() data: any) : Promise<MemberResponse> {
    const member = await this.profiles.setPrimary(uid, data.id);
    if (member === undefined) throw new NotFoundException('Member not found');
    return { member };
  }
}

export default MembershipPrimaryProfileController;