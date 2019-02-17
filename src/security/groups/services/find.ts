import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group';

@Injectable()
export class GroupFindService {
  constructor(
    @InjectRepository(Group)
    private readonly repository: Repository<Group>,
  ) {}
  
  async findOne(id: number): Promise<Group> {
    return this.repository.findOne(id);
  }

  async find(): Promise<Group[]> {
    return this.repository.find();
  }
}

export default GroupFindService;