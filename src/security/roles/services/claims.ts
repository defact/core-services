import { Injectable } from '@nestjs/common';
import { RoleFindService } from './find';
import { RoleEditService } from './edit';
import { Role, Claim } from '../entities/role';

@Injectable()
export class ClaimsService {
  constructor(
    private readonly finder: RoleFindService,
    private readonly editor: RoleEditService,
  ) {}
  
  async set(id: number, data: Claim): Promise<Role> {
    const role = await this.finder.findOne(id);

    if (role === undefined) return;

    const existing = (role.claims.find(((claim: Claim) => {
      return claim.entity === data.entity;
    })));

    if (existing) {
      existing.right = data.right;
    } else {
      role.claims.push(data);
    };

    return this.editor.update(role.id, role);
  }

  async remove(id: number, entity: string): Promise<Role> {
    return this.set(id, { entity, right: 0 });
  }
}

export default ClaimsService;