import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../security/group/entities/group';
import { Role } from '../security/role/entities/role';
import { User } from '../security/user/entities/user';
import { Profile } from '../profiles/profile/entities/profile';
import { Access } from '../membership/entities/access';
import { Key } from '../security/common/key';
import { Hasher } from '../common/helpers/hash';
import { range } from 'lodash';

import faker = require('faker');
import { Claim, Entity, Right } from 'dist/src/security/common/claim';
import { Permission } from 'src/security/common/claim';

interface Member {
  email: string;
  name: string;
  isFixed: boolean;
  role: Role;
  key: Key;
}

const SYSTEM_KEY = { start: 0, end: 9999999999999999 };
const GUEST_KEY = { start: 0, end: 99999999999999 };

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

  async member(data: Member): Promise<void> {
    const hash = new Hasher();
    
    const { email, name, isFixed, role, key } = data;

    const password = hash.generate(name.toLowerCase()).hash;

    await this.userRepository.save({ email, isFixed, password, key });
    await this.profileRepository.save({ name, isFixed, key });

    // Workaround for sqljs
    const user = await this.userRepository.findOne({ email });
    const profile = await this.profileRepository.findOne({ name });

    this.userRepository.merge(user, { roles: [ role ]});
    await this.userRepository.save(user);
 
    await this.accessRepository.save({ user: user.id, profile: profile.id });
  }

  async initial(): Promise<void> {
    const sys = await this.groupRepository.save({ name: 'System', key: SYSTEM_KEY, isFixed: true });
    await this.groupRepository.save({ name: 'Guest', parent: sys, key: GUEST_KEY, isFixed: true });
    
    const systemClaims: Claim[] = [{ entity: Entity.User, right: 15 }, { entity: Entity.Group, right: 15 }, { entity: Entity.Profile, right: 15 }];
    const guestClaims: Claim[] = [{ entity: Entity.User, right: 3 }, { entity: Entity.Profile, right: 3 }];

    const system = await this.roleRepository.save({ name: 'system', isFixed: true, claims: systemClaims });
    const guest = await this.roleRepository.save({ name: 'guest', isFixed: true, claims: guestClaims });

    await this.member({ email: 'system@recipher.co.uk', name: 'System', isFixed: true, role: system, key: SYSTEM_KEY });
    await this.member({ email: 'guest@recipher.co.uk', name: 'Guest', isFixed: true, role: guest, key: GUEST_KEY });
  }

  async setup(): Promise<void> {
    const group = await this.groupRepository.find({ name: 'System' });

    if (group.length === 0) await this.initial();
    // if (group.length) return;

    const guest = await this.roleRepository.findOne({ name: 'guest' });

    const member = async () => {
      const email = faker.internet.email().toLowerCase();
      const name = faker.name.findName();
      return await this.member({ email, name, isFixed: false, role: guest, key: GUEST_KEY });
    };

    await Promise.all(range(50).map(member)).catch(err => console.log(err));
  }
}

export default SetupService;