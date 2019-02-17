import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user';

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

  async find(): Promise<User[]> {
    return this.repository.find({ relations: ['roles'] });
  }
}

export default UserFindService;