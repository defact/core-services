import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { Profile } from '../../profiles/profile/entities/profile';
import { User } from '../../security/user/entities/user';
import { Access } from '../entities/access';
import { ProfileFindService } from '../../profiles/profile/services/find';
import { UserFindService } from '../../security/user/services/find';

export class ProfileWithUsers extends Profile {
  primary: number;
  users: User[];
}

@Injectable()
export class MembershipProfileUsersService {
  constructor(
    @InjectRepository(Access)
    private readonly repository: Repository<Access>,
    private readonly profile: ProfileFindService,
    private readonly user: UserFindService,
  ) {}
  
  private primary(accesses: Access[]): number {
    const primary = accesses.filter(a => a.isPrimary);
    return primary.length === 0 ? accesses[0].user : primary[0].user;
  }  

  private clean(users: User[]): any[] {
    return users.map(u => classToPlain(u));
  }
  
  async add(pid: number, uid: number): Promise<ProfileWithUsers> {
    const profile = await this.profile.findOne(pid);
    const user = await this.user.findOne(uid);

    if (profile === undefined || user === undefined) return;

    await this.repository.save({ user: user.id, profile: profile.id });

    const accesses = await this.repository.find({ profile: profile.id });
    const users = await this.user.findByIds(accesses.map(a => a.user));

    return { ...profile, primary: this.primary(accesses), users: this.clean(users) };
  }
  
  async list(pid: number): Promise<ProfileWithUsers> {
    const profile = await this.profile.findOne(pid);

    if (profile === undefined) return;

    const accesses = await this.repository.find({ profile: pid });

    if (accesses.length === 0) return { ...profile, primary: null, users: [] };

    const users = await this.user.findByIds(accesses.map(a => a.user));

    return { ...profile, primary: this.primary(accesses), users: this.clean(users) };
  }
}

export default MembershipProfileUsersService;