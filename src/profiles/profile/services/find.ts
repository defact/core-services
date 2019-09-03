import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Profile } from '../entities/profile';

export interface ProfileQueryOptions {
  name: string;
  classifier: string;
  isArchived: boolean;
}

@Injectable()
export class ProfileFindService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {}

  async findOne(id: number): Promise<Profile> {
    return this.repository.findOne(id, { relations: ['contacts'] });
  }

  async find(query?: ProfileQueryOptions): Promise<Profile[]> {
    query = { ...query, isArchived: false };
    return this.repository.find({ where: query, relations: ['contacts'] });
  }

  async findByIds(ids: number[]): Promise<Profile[]> {
    if (ids.length === 0) { return []; }
    return this.repository.find({ where: { id: In(ids), isArchived: false }, relations: ['contacts'] });
  }
}

export default ProfileFindService;
