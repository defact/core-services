import { Controller, Get, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClaimGuard } from '../../common/guards/claim';
import { MembershipUserProfilesService, UserWithProfiles } from '../services/profiles';

interface UserWithProfilesResponse { user: UserWithProfiles };

@Controller('membership')
export class MembershipController {
  constructor(
    private readonly profiles: MembershipUserProfilesService
  ) {}

  @Get()
  @UseGuards(new ClaimGuard('user'))
  async list(@Request() request: any) : Promise<UserWithProfilesResponse> {
    const session = request.user;
    if (session === undefined) throw new UnauthorizedException(); // Shouldn't happen
    const user = await this.profiles.list(session.id);
    return { user };
  }
}

export default MembershipController;