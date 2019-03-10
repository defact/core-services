import { Injectable } from '@nestjs/common';
import { Session } from '../../interfaces/session';
import { UserFindService } from '../../../user/services/find';
import { UserEditService } from '../../../user/services/edit';
import { User } from '../../../user/entities/user';

@Injectable()
export class CodeAuthenticator {
  constructor(
    private readonly finder: UserFindService,
    private readonly editor: UserEditService,
  ) {}

  async verify(session: Session): Promise<User> {
    const user: User = await this.finder.findOneByCode(session.code);

    if (user === undefined) { return; }
    if (user.isLocked) { return; }

    user.verificationCode = null;

    return this.editor.update(user.id, user, { force: true });
  }
}

export default CodeAuthenticator;
