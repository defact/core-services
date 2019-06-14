import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag';

@Injectable()
export class TagEditService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async create(data: Tag): Promise<Tag> {
    return await this.repository.save(data);
  }

  async update(id: number, data: Partial<Tag>): Promise<Tag> {
    const tag: Tag = await this.repository.findOne(id);
    if (tag === undefined) { return; }
    this.repository.merge(tag, data);
    return this.repository.save(tag);
  }

  async remove(id: number): Promise<Tag> {
    return this.update(id, { isArchived: true });
  }
}

export default TagEditService;
