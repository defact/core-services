import { Injectable } from '@nestjs/common';
import { Hasher } from '../../../common/helpers/hash';
import { Tokenizer } from '../../../common/helpers/token';
import { UserFindService } from './find';
import { UserEditService } from './edit';
import { User } from '../entities/user';
import { Password } from '../dto/password';

@Injectable()
export class PasswordService {
  constructor(
    private readonly finder: UserFindService,
    private readonly editor: UserEditService,
    private readonly hash: Hasher,
    private readonly token: Tokenizer,
  ) {}

  async change(id: number, password: Password): Promise<User> {
    const user = await this.finder.findOne(id);

    if (user === undefined) { return; }

    user.password = this.hash.generate(password.password).hash;
    user.forceChangePassword = !!password.isTemporary;

    return this.editor.update(user.id, user, { force: true });
  }

  async reset(id: number): Promise<User> {
    const password: string = this.token.generate(12);

    return this.change(id, { password, isTemporary: true });
  }
}

export default PasswordService;
