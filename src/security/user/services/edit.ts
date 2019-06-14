import { Injectable, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { RolesService } from './roles';
import { GroupService } from './group';
import { Hasher } from '../../../common/helpers/hash';
import { Tokenizer } from '../../../common/helpers/token';
import { User } from '../entities/user';

interface EditOptions { force: boolean };

@Injectable()
export class UserEditService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @Inject(forwardRef(() => RolesService))
    private readonly role: RolesService,
    @Inject(forwardRef(() => GroupService))
    private readonly group: GroupService,
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

    let group = await this.group.findDefault(); // TODO in context of logged in user

    data.key = group.key;

    try {
      const user = await this.repository.save(data);
      
      return this.role.addDefault(user.id);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException('Email address already registered');
      }
      throw err;
    }
  }

  async update(id: number, data: Partial<User>, options: EditOptions = { force: false }): Promise<User> {
    const user: User = await this.repository.findOne(id);
    if (user === undefined || (user.isFixed && !options.force)) { return; }
    this.repository.merge(user, data);
    return this.repository.save(user);
  }

  async remove(id: number): Promise<User> {
    return this.update(id, { isArchived: true });
  }
}

export default UserEditService;
