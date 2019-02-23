import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../profiles/profile/entities/profile';
import { User } from '../../security/user/entities/user';
import { Access } from '../entities/access';
import { ProfileFindService } from '../../profiles/profile/services/find';
import { ProfileEditService } from '../../profiles/profile/services/edit';
import { UserFindService } from '../../security/user/services/find';

export class UserWithProfiles {
  id: number;
  user: User;
  primaryProfile: number;
  profiles: Profile[];
}

@Injectable()
export class MembershipUserProfilesService {
  constructor(
    @InjectRepository(Access)
    private readonly repository: Repository<Access>,
    private readonly profile: ProfileFindService,
    private readonly create: ProfileEditService,
    private readonly user: UserFindService,
  ) {}

  private primary(accesses: Access[]): number {
    const primary = accesses.filter(a => a.isPrimary);
    return primary.length === 0 ? accesses[0].profile : primary[0].profile;
  }

  async add(uid: number, data: any): Promise<UserWithProfiles> {
    const profile = (data.id)
      ? await this.profile.findOne(data.id)
      : await this.create.create({ name: data.name } as Profile);

    return this.connect(uid, profile);
  }

  async setPrimary(uid: number, pid: number): Promise<UserWithProfiles> {
    const user = await this.user.findOne(uid);
    const profile =  await this.profile.findOne(pid);

    if (user === undefined || profile === undefined) { return; }

    const accesses = await this.repository.find({ isPrimary: true });

    Promise.all(accesses.map(async access => {
      access.isPrimary = false;
      return await this.repository.save(access);
    }));

    const access = accesses.find(a => a.user === uid && a.profile === pid);

    this.repository.merge(access, { isPrimary: true });
    await this.repository.save(access);

    const profiles = await this.profile.findByIds(accesses.map(a => a.profile));

    return { id: user.id, user, primaryProfile: this.primary(accesses), profiles } as UserWithProfiles;
  }

  async connect(uid: number, profile: Profile): Promise<UserWithProfiles> {
    if (profile === undefined) { return; }

    const user = await this.user.findOne(uid);
    if (user === undefined) { return; }

    await this.repository.save({ user: user.id, profile: profile.id });

    const accesses = await this.repository.find({ user: user.id });
    const profiles = await this.profile.findByIds(accesses.map(a => a.profile));

    delete user.password;
    delete user.verificationCode;

    return { id: user.id, user, primaryProfile: this.primary(accesses), profiles } as UserWithProfiles;
  }

  async list(uid: number): Promise<UserWithProfiles> {
    const user = await this.user.findOne(uid);

    if (user === undefined) { return; }

    const accesses = await this.repository.find({ user: user.id });

    if (accesses.length === 0) { return { user, primaryProfile: null, profiles: [] } as UserWithProfiles; }

    const profiles = await this.profile.findByIds(accesses.map(a => a.profile));

    return { id: user.id, user, primaryProfile: this.primary(accesses), profiles } as UserWithProfiles;
  }
}

export default MembershipUserProfilesService;
