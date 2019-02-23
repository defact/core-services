import { Controller, Get, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../security/common/claim';
import { MembershipUserProfilesService, UserWithProfiles } from '../services/profiles';

interface MemberResponse { member: UserWithProfiles; }

@Controller('membership')
export class MembershipController {
  constructor(
    private readonly profiles: MembershipUserProfilesService,
  ) {}

  @Get()
  @UseGuards(new ClaimGuard(Entity.User))
  async list(@Request() request: any): Promise<MemberResponse> {
    const session = request.user;
    if (session === undefined) { throw new UnauthorizedException(); } // Shouldn't happen
    const member = await this.profiles.list(session.id);
    return { member };
  }
}

export default MembershipController;
