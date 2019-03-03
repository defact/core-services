import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Group } from '../entities/group';
import KeyService from './key';

@Injectable()
export class GroupEditService {
  constructor(
    @InjectRepository(Group)
    private readonly repository: Repository<Group>,
    private readonly key: KeyService,
  ) {}

  async create(data: Group): Promise<Group> {
    try {
      const parent = await this.repository.findOne(data.parent, { relations: ['children'] });

      data.parent = parent;
      data.key = this.key.determine(parent);
      
      return await this.repository.save(data);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Duplicate group name');
      }
      throw err;
    }
  }

  async update(id: number, data: Group): Promise<Group> {
    const group: Group = await this.repository.findOne(id);
    if (group === undefined) { return; }
    this.repository.merge(group, data);
    return this.repository.save(group);
  }

  async remove(id: number): Promise<Group> {
    const group: Group = await this.repository.findOne(id);
    if (group === undefined) { return; }
    return this.repository.remove(group);
  }
}

export default GroupEditService;
