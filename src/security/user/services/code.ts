import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tokenizer } from '../../../common/helpers/token';
import { UserFindService } from './find';
import { User } from '../entities/user';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly finder: UserFindService,
    private readonly token: Tokenizer,
  ) {}

  async reset(email: string): Promise<User> {
    const user = await this.finder.findOneByEmail(email);
    if (user === undefined) { return; }

    const verificationCode: string = this.token.generate(8);

    this.repository.merge(user, { verificationCode });
    return this.repository.save(user);
  }
}

export default VerificationCodeService;
