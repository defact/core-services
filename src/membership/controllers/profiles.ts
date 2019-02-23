import { Controller, Post, Body, Param, ParseIntPipe, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../security/common/claim';
import { MembershipUserProfilesService, UserWithProfiles } from '../services/profiles';

interface MemberResponse { member: UserWithProfiles; }

@Controller('memberships/:uid/profiles')
export class MembershipUserProfilesController {
  constructor(
    private readonly profiles: MembershipUserProfilesService,
  ) {}

  @Post()
  @UseGuards(new ClaimGuard(Entity.User))
  async add(@Param('uid', ParseIntPipe) uid: number, @Body() data: any): Promise<MemberResponse> {
    const member = await this.profiles.add(uid, data);
    if (member === undefined) { throw new NotFoundException('Member not found'); }
    return { member };
  }

  @Get()
  @UseGuards(new ClaimGuard(Entity.User))
  async list(@Param('uid', ParseIntPipe) uid: number): Promise<MemberResponse> {
    const member = await this.profiles.list(uid);
    if (member === undefined) { throw new NotFoundException('Member not found'); }
    return { member };
  }
}

export default MembershipUserProfilesController;
