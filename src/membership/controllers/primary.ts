import { Controller, Put, Body, Param, ParseIntPipe, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../security/common/claim';
import { MembershipUserProfilesService, UserWithProfiles } from '../services/profiles';

interface MemberResponse { member: UserWithProfiles; }

@Controller('memberships/:uid/profiles/primary')
export class MembershipPrimaryProfileController {
  constructor(
    private readonly profiles: MembershipUserProfilesService,
  ) {}

  @Put()
  @UseGuards(new ClaimGuard(Entity.User))
  async set(@Param('uid', ParseIntPipe) uid: number, @Body() data: any): Promise<MemberResponse> {
    const member = await this.profiles.setPrimary(uid, data.id);
    if (member === undefined) { throw new NotFoundException('Member not found'); }
    return { member };
  }
}

export default MembershipPrimaryProfileController;
