import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from '../entities/role';

export interface RoleQueryOptions {
  name: string;
  isArchived: boolean;
}

@Injectable()
export class RoleFindService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async findOne(id: number): Promise<Role> {
    return this.repository.findOne(id);
  }

  async findDefault(): Promise<Role> {
    return this.repository.findOne({ name: 'guest' });
  }

  async find(query?: RoleQueryOptions): Promise<Role[]> {
    query = { ...query, isArchived: false };
    return this.repository.find({ where: query });
  }

  async findByIds(ids: number[]): Promise<Role[]> {
    if (ids.length === 0) { return []; }
    return this.repository.find({ where: { id: In(ids), isArchived: false }});
  }
}

export default RoleFindService;
