import * as _ from 'lodash';
import { User } from '../../security/user/entities/user';
import { Role } from '../../security/role/entities/role';
import { Claim, Right, Permission } from '../../security/common/claim';

interface Options {
  user?: User,
  claims?: Claim[]
}

export class Authorize {
  readonly claims: Claim[];

  constructor(options: Options) {
    if (options.user) this.claims = this.init(this.fromUser(options.user));
    if (options.claims) this.claims = this.init(options.claims);
  }

  private init(claims: Claim[]): Claim[] {
    if (claims === undefined) return [];
    
    return _
    .chain(claims)
    .map('entity')
    .uniq()
    .map((entity: string) => {
      return { entity: entity, right: this.combine(claims, entity) };
    })
    .value();
  };
  
  private combine(claims: Claim[], entity: string): number {
    return _
    .chain(claims)
    .filter(c => c.entity === entity)
    .map('right')
    .reduce((l, r) => l | r, 0)
    .value();
  };

  private fromUser(user: User): Claim[] {
    if (user === undefined) return [];
    
    const roles = user.roles || [] //).concat({ claims: user.claims });

    const claims = _
    
    .chain(roles)
    .map((role: Role) => {
      return _(role.claims).map((claim: Claim) => {
        return claim;
      }).value();
    })
    .flatten()
    .value();

    return claims;
  }

  can(entity: string, right: Right) {
    if (this.claims === undefined) return false;
    
    const claim: Claim = this.claims.find(c => c.entity === entity);

    if (claim === undefined) return false;
  
    if (claim.right === Right.Nothing && right !== Right.Nothing) return false;
    if (claim.right === Right.Nothing && right === Right.Nothing) return true;
  
    return (claim.right | right) === claim.right;
  }
}
