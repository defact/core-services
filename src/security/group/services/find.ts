import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group';

export interface GroupQueryOptions {
  parent: number;
}

@Injectable()
export class GroupFindService {
  constructor(
    @InjectRepository(Group)
    private readonly repository: Repository<Group>,
  ) {}

  async findOne(id: number): Promise<Group> {
    return this.repository.findOne(id, { relations: ['children'] });
  }

  async findDefault(): Promise<Group> {
    return this.repository.findOne({ name: 'guest' }, { relations: ['children'] });
  }

  async find(query?: GroupQueryOptions): Promise<Group[]> {
    return this.repository.find({ where: query, relations: ['children'] });
  }
}

export default GroupFindService;
