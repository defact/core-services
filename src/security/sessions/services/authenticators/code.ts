import { Injectable } from '@nestjs/common';
import { Session } from '../../interfaces/session';
import { UserFindService } from '../../../users/services/find';
import { UserEditService } from '../../../users/services/edit';
import { User } from '../../../users/entities/user';

@Injectable()
export class CodeAuthenticator {
  constructor(
    private readonly finder: UserFindService,
    private readonly editor: UserEditService,
  ) {}
  
  async verify(session: Session): Promise<User> {
    const user: User = await this.finder.findOneByCode(session.code);

    if (user === undefined) return;
    if (user.isLocked) return;
  
    user.verificationCode = null;

    return this.editor.update(user.id, user);
  }
}

export default CodeAuthenticator;