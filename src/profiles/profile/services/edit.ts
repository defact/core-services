import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile';
import { ProfileGroupService } from './group';

@Injectable()
export class ProfileEditService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
    @Inject(forwardRef(() => ProfileGroupService))
    private readonly group: ProfileGroupService,    
  ) {}

  async create(data: Profile): Promise<Profile> {
    const group = await this.group.findDefault();
    data.key = group.key; // TODO use context

    return await this.repository.save(data);
  }

  async update(id: number, data: Profile): Promise<Profile> {
    const profile: Profile = await this.repository.findOne(id);
    if (profile === undefined || profile.isFixed) { return; }
    this.repository.merge(profile, data);
    return this.repository.save(profile);
  }

  async remove(id: number): Promise<Profile> {
    const profile: Profile = await this.repository.findOne(id);
    if (profile === undefined || profile.isFixed) { return; }
    return this.repository.remove(profile);
  }
}

export default ProfileEditService;
