import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../security/common/claim';
import { MembershipDto } from '../dto/membership';
import { MembershipRegistrationService } from '../services/register';
import { UserWithProfiles } from '../services/profiles';

interface UserWithProfilesResponse { user: UserWithProfiles; }

@Controller('memberships')
export class MembershipsController {
  constructor(
    private readonly register: MembershipRegistrationService,
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard(Entity.User))
  async create(@Body() data: MembershipDto): Promise<UserWithProfilesResponse> {
    const user = await this.register.create(data);
    return { user };
  }
}

export default MembershipsController;
