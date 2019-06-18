import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../entities/user';
import { Key } from '../../common/key';

export class UserQueryOptions {
  email: string;
  isArchived: boolean;
  key: Key
}

@Injectable()
export class UserFindService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.repository.findOne(id, { relations: ['roles'] });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email }, { relations: ['roles'] });
  }

  async findOneByCode(verificationCode: string): Promise<User> {
    return this.repository.findOne({ verificationCode }, { relations: ['roles'] });
  }

  async find(query?: UserQueryOptions): Promise<User[]> {
    query = { ...query, isArchived: false };
    return this.repository.find({ where: Key.toWhere(query), relations: ['roles'] });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    if (ids.length === 0) { return []; }
    return this.repository.find({ where: { id: In(ids), isArchived: false }, relations: ['roles'] });
  }
}

export default UserFindService;
