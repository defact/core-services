import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Role } from '../entities/role';

@Injectable()
export class RoleEditService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(data: Role): Promise<Role> {
    try {
      const role = await this.repository.save(data);
      return role;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException('Duplicate role name');
      }
      throw err;
    }
  }

  async update(id: number, data: Partial<Role>): Promise<Role> {
    const role: Role = await this.repository.findOne(id);
    if (role === undefined || role.isFixed) { return; }
    this.repository.merge(role, data);
    return this.repository.save(role);
  }

  async remove(id: number): Promise<Role> {
    return this.update(id, { isArchived: true });
  }
}

export default RoleEditService;
