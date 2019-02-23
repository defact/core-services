import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Hasher } from '../../../common/helpers/hash';
import { Tokenizer } from '../../../common/helpers/token';
import { User } from '../entities/user';

@Injectable()
export class UserEditService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly hash: Hasher,
    private readonly token: Tokenizer,
  ) {}

  async create(data: User): Promise<User> {
    if (data.password === undefined) {
      data.password = this.token.generate(12);
      data.forceChangePassword = true;
    }

    data.password = this.hash.generate(data.password).hash;
    data.verificationCode = this.token.generate(8);

    try {
      const user = await this.repository.save(data);
      return user;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException('Email address already registered');
      }
      throw err;
    }
  }

  async update(id: number, data: User): Promise<User> {
    const user: User = await this.repository.findOne(id);
    if (user === undefined) { return; }
    this.repository.merge(user, data);
    return this.repository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.repository.findOne(id);
    if (user === undefined) { return; }
    return this.repository.remove(user);
  }
}

export default UserEditService;
