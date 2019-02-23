import { Injectable } from '@nestjs/common';
import { Session } from '../../interfaces/session';
import { UserFindService } from '../../../user/services/find';
import { User } from '../../../user/entities/user';
import { Hasher } from '../../../../common/helpers/hash';

@Injectable()
export class PasswordAuthenticator {
  constructor(
    private readonly finder: UserFindService,
    private readonly hash: Hasher,
  ) {}

  async verify(session: Session): Promise<User> {
    const user: User = await this.finder.findOneByEmail(session.email);

    if (user === undefined) { return; }
    if (user.isLocked) { return; }
    if (this.hash.verify(user.password, session.password) === false) { return; }

    return user;
  }
}

export default PasswordAuthenticator;
