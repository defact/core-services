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

@Injectable()
export class MembershipRegistrationService {
  constructor(
    @InjectRepository(Access)
    private readonly repository: Repository<Access>,

    private readonly profile: ProfileEditService,
    private readonly user: UserEditService,
  ) {}
  
  async create(data: MembershipDto): Promise<UserWithProfiles> {
    const { email, name, password } = data;

    const user = await this.user.create({ email, name, password } as User);
    const profile = await this.profile.create({ name } as Profile);

    await this.repository.save({ user: user.id, profile: profile.id, isPrimary: true });

    delete user.password;
    delete user.verificationCode;

    return { ...user, primary: profile.id, profiles: [ profile ] };
  }
}

export default MembershipRegistrationService;