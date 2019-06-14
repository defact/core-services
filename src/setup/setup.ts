import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../security/group/entities/group';
import { Role } from '../security/role/entities/role';
import { User } from '../security/user/entities/user';
import { Profile } from '../profiles/profile/entities/profile';
import { Access } from '../membership/entities/access';
import { Hasher } from '../common/helpers/hash';

@Injectable()
export class SetupService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.setup();
  }

  async setup(): Promise<void> {
    const group = await this.groupRepository.find({ name: 'System' });

    if (group.length) return;

    const hash = new Hasher();

    const systemKey = { start: 0, end: 9999999999999999 };
    const guestKey = { start: 0, end: 99999999999999 };

    const systemGroup = await this.groupRepository.save({ name: 'System', key: systemKey, isFixed: true });
    const guestGroup = await this.groupRepository.save({ name: 'Guest', parent: systemGroup, key: { start: 0, end: 99999999999999 }, isFixed: true });
    
    const systemClaims = [{ entity: 'user', right: 15 }, { entity: 'group', right: 15 }, { entity: 'profile', right: 15 }];
    const guestClaims = [{ entity: 'user', right: 3 }];

    const systemRole = await this.roleRepository.save({ name: 'system', isFixed: true, claims: systemClaims });
    const guestRole = await this.roleRepository.save({ name: 'guest', isFixed: true, claims: guestClaims });
    
    const systemUser = await this.userRepository.save({ email: 'system@recipher.co.uk', isFixed: true, roles: [ systemRole ], password: hash.generate('password').hash, key: systemKey });
    const guestUser = await this.userRepository.save({ email: 'guest@recipher.co.uk', isFixed: true, roles: [ guestRole ], password: hash.generate('password').hash, key: guestKey });
    
    const systemProfile = await this.profileRepository.save({ name: 'System', isFixed: true, key: systemKey });
    const guestProfile = await this.profileRepository.save({ name: 'Guest', isFixed: true, key: guestKey });

    await this.accessRepository.save({ user: systemUser.id, profile: systemProfile.id });
    await this.accessRepository.save({ user: guestUser.id, profile: guestProfile.id });
  }
}

export default SetupService;