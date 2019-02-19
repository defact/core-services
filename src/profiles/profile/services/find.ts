import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Profile } from '../entities/profile';

@Injectable()
export class ProfileFindService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {}
  
  async findOne(id: number): Promise<Profile> {
    return this.repository.findOne(id);
  }  

  async find(): Promise<Profile[]> {
    return this.repository.find();
  }

  async findByIds(ids: number[]): Promise<Profile[]> {
    if (ids.length === 0) return [];
    return this.repository.find({ where: { id: In(ids) }});
  }
}

export default ProfileFindService;