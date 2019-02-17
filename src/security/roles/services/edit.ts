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
    } catch(err) {
      console.log(err)
      if (err instanceof QueryFailedError)
        throw new BadRequestException('Validation error');
      throw err;
    }
  }

  async update(id: number, data: Role): Promise<Role> {
    const role: Role = await this.repository.findOne(id);
    if (role === undefined) return;
    this.repository.merge(role, data);
    return this.repository.save(role);
  }

  async remove(id: number): Promise<Role> {
    const role: Role = await this.repository.findOne(id);
    if (role === undefined) return;
    return this.repository.remove(role);
  }
}

export default RoleEditService;