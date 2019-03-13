import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Group } from '../entities/group';

export interface GroupQueryOptions {
  parent: number;
  name: string;
  isArchived: boolean;
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
    return this.repository.findOne({ name: 'Guest' }, { relations: ['children'] });
  }

  async find(query?: GroupQueryOptions): Promise<Group[]> {
    query = { ...query, isArchived: false };
    return this.repository.find({ where: query, relations: ['children'] });
  }

  async findByIds(ids: number[]): Promise<Group[]> {
    if (ids.length === 0) { return []; }
    return this.repository.find({ where: { id: In(ids), isArchived: false, relations: ['children'] }});
  }
}

export default GroupFindService;
