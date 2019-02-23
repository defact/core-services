import { Injectable } from '@nestjs/common';
import { UserFindService } from './find';
import { UserEditService } from './edit';
import { RoleFindService } from '../../role/services/find';
import { User } from '../entities/user';
import { Role } from '../../role/entities/role';

@Injectable()
export class RolesService {
  constructor(
    private readonly roles: RoleFindService,
    private readonly finder: UserFindService,
    private readonly editor: UserEditService,
  ) {}

  async add(uid: number, rid: number): Promise<User> {
    const role: Role = await this.roles.findOne(rid);
    const user: User = await this.finder.findOne(uid);

    if (user === undefined) { return; }
    if (user === undefined) { return user; }

    const contains: boolean = (user.roles.some((role: Role) => {
      return role.id === rid;
    }));

    if (contains === true) { return user; }

    user.roles.push(role);

    return this.editor.update(user.id, user);
  }

  async remove(uid: number, rid: number): Promise<User> {
    const user = await this.finder.findOne(uid);

    if (user === undefined) { return; }

    const roles: Role[] = (user.roles.filter((role: Role) => {
      return role.id !== rid;
    }));

    if (user.roles.length === roles.length) { return user; }

    user.roles = roles;

    return this.editor.update(user.id, user);
  }
}

export default RolesService;
