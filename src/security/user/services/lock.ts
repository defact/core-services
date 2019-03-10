import { Injectable } from '@nestjs/common';
import { UserFindService } from './find';
import { UserEditService } from './edit';
import { User } from '../entities/user';

@Injectable()
export class UserLockService {
  constructor(
    private readonly finder: UserFindService,
    private readonly editor: UserEditService,
  ) {}

  async lock(id: number): Promise<User> {
    const user = await this.finder.findOne(id);

    if (user === undefined || user.isFixed) { return; }

    user.isLocked = !user.isLocked;

    return this.editor.update(user.id, user);
  }
}

export default UserLockService;
