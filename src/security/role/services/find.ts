import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role';

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

  async find(): Promise<Role[]> {
    return this.repository.find();
  }
}

export default RoleFindService;
