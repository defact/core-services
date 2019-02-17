import { Injectable } from '@nestjs/common';
import { UserFindService } from './find';
import { UserEditService } from './edit';
import { RoleFindService } from '../../roles/services/find';
import { User } from '../entities/user';
import { Role } from '../../roles/entities/role';

@Injectable()
export class RolesService {
  constructor(
    private readonly roles: RoleFindService,
    private readonly finder: UserFindService,
    private readonly editor: UserEditService,
  ) {}
  
  async add(id: number, data: any): Promise<User> {
    const role: Role = await this.roles.findOne(data.id);
    const user: User = await this.finder.findOne(id);

    if (user === undefined) return;
    if (user === undefined) return user;

    const contains: boolean = (user.roles.some((role: Role) => {
      return role.id === data.id;
    }));

    if (contains === true) return user;

    user.roles.push(role);
console.log(user)
    return this.editor.update(user.id, user);
  }

  async remove(id: number, roleId: number): Promise<User> {
    const user = await this.finder.findOne(id);

    if (user === undefined) return;

    const roles: Role[] = (user.roles.filter((role: Role) => {
      return role.id !== roleId;
    }));
    
    if (user.roles.length === roles.length) return user;

    user.roles = roles;

    return this.editor.update(user.id, user);
  }
}

export default RolesService;