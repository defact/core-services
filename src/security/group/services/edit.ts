import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Group } from '../entities/group';

@Injectable()
export class GroupEditService {
  constructor(
    @InjectRepository(Group)
    private readonly repository: Repository<Group>,
  ) {}
  
  async create(data: Group): Promise<Group> {
    try {
      const group = await this.repository.save(data);
      return group;
    } catch(err) {
      if (err instanceof QueryFailedError)
        throw new BadRequestException('Duplicate group name');
      throw err;
    }
  }

  async update(id: number, data: Group): Promise<Group> {
    const group: Group = await this.repository.findOne(id);
    if (group === undefined) return;
    this.repository.merge(group, data);
    return this.repository.save(group);
  }

  async remove(id: number): Promise<Group> {
    const group: Group = await this.repository.findOne(id);
    if (group === undefined) return;
    return this.repository.remove(group);
  }
}

export default GroupEditService;