import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../profiles/profile/entities/profile';
import { User } from '../../security/user/entities/user';
import { Access } from '../entities/access';
import { ProfileFindService } from '../../profiles/profile/services/find';
import { UserFindService } from '../../security/user/services/find';

export class UserWithProfiles extends User {
  primary: number;
  profiles: Profile[];
}

@Injectable()
export class MembershipUserProfilesService {
  constructor(
    @InjectRepository(Access)
    private readonly repository: Repository<Access>,

    private readonly profile: ProfileFindService,
    private readonly user: UserFindService,
  ) {}

  private primary(accesses: Access[]): number {
    const primary = accesses.filter(a => a.isPrimary);
    return primary.length === 0 ? accesses[0].profile : primary[0].profile;
  }

  async add(uid: number, pid: number): Promise<UserWithProfiles> {
    const profile = await this.profile.findOne(pid);
    const user = await this.user.findOne(uid);

    if (profile === undefined || user === undefined) return;

    await this.repository.save({ user: user.id, profile: profile.id });

    const accesses = await this.repository.find({ user: user.id });
    const profiles = await this.profile.findByIds(accesses.map(a => a.profile));

    delete user.password;
    delete user.verificationCode;

    return { ...user, primary: this.primary(accesses), profiles };
  }  

  async list(uid: number): Promise<UserWithProfiles> {
    const user = await this.user.findOne(uid);

    if (user === undefined) return;

    delete user.password;
    delete user.verificationCode;

    const accesses = await this.repository.find({ user: user.id });

    if (accesses.length === 0) return { ...user, primary: null, profiles: [] };

    const profiles = await this.profile.findByIds(accesses.map(a => a.profile));

    return { ...user, primary: this.primary(accesses), profiles };
  }
}

export default MembershipUserProfilesService;