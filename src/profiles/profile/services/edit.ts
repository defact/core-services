import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Profile } from '../entities/profile';

@Injectable()
export class ProfileEditService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {}
  
  async create(data: Profile): Promise<Profile> {
    return await this.repository.save(data);
  }

  async update(id: number, data: Profile): Promise<Profile> {
    const profile: Profile = await this.repository.findOne(id);
    if (profile === undefined) return;
    this.repository.merge(profile, data);
    return this.repository.save(profile);
  }

  async remove(id: number): Promise<Profile> {
    const profile: Profile = await this.repository.findOne(id);
    if (profile === undefined) return;
    return this.repository.remove(profile);
  }
}

export default ProfileEditService;