import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tag } from '../entities/tag';

export interface TagQueryOptions {
  isArchived: boolean;
}

@Injectable()
export class TagFindService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async findOne(id: number): Promise<Tag> {
    return this.repository.findOne(id);
  }

  async find(query?: TagQueryOptions): Promise<Tag[]> {
    query = { ...query, isArchived: false };
    return this.repository.find({ where: query });
  }
}

export default TagFindService;
