import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipDto } from '../dto/membership';
import { Profile } from '../../profiles/profile/entities/profile';
import { User } from '../../security/user/entities/user';
import { Access } from '../entities/access';
import { UserWithProfiles } from './profiles';
import { ProfileEditService } from '../../profiles/profile/services/edit';
import { UserEditService } from '../../security/user/services/edit';
import { EmailRegistrationService } from './email';

@Injectable()
export class MembershipRegistrationService {
  constructor(
    @InjectRepository(Access)
    private readonly repository: Repository<Access>,

    private readonly profile: ProfileEditService,
    private readonly user: UserEditService,
    private readonly email: EmailRegistrationService,
  ) {}

  async create(data: MembershipDto): Promise<UserWithProfiles> {
    const { email, name, password } = data;

    const user = await this.user.create({ email, password } as User);
    const profile = await this.profile.create({ name } as Profile);

    await this.repository.save({ user: user.id, profile: profile.id, isPrimary: true });

    await this.email.send(user);

    return { id: user.id, user, primaryProfile: profile.id, profiles: [ profile ] } as UserWithProfiles;
  }
}

export default MembershipRegistrationService;
