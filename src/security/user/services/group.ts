import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserFindService } from './find';
import { UserEditService } from './edit';
import { GroupFindService } from '../../group/services/find';
import { User } from '../entities/user';
import { Group } from '../../group/entities/group';

@Injectable()
export class GroupService {
  constructor(
    private readonly group: GroupFindService,
    private readonly finder: UserFindService,
    @Inject(forwardRef(() => UserEditService))
    private readonly editor: UserEditService,
  ) {}

  async move(uid: number, gid: number): Promise<User> {
    const group: Group = await this.group.findOne(gid);
    const user: User = await this.finder.findOne(uid);

    if (user === undefined) { return; }
    if (group === undefined) { return user; }

    user.key = group.key;

    return this.editor.update(user.id, user);
  }

  async moveToDefault(uid: number): Promise<User> {
    const group: Group = await this.findDefault();
    return this.move(uid, group.id);
  }

  async findDefault(): Promise<Group> {
    return this.group.findDefault();
  }
}

export default GroupService;
