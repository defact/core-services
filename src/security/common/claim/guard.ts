import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Entity, Right } from './claim';
import { Authorize } from './authorize';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class ClaimGuard extends AuthGuard('jwt') {
  constructor(private readonly entity: Entity, private right?: Right) {
    super('jwt');
  }

  private rightForMethod(method: string): Right {
    return {
      GET: Right.Read,
      POST: Right.Create,
      PUT: Right.Update,
      PATCH: Right.Update,
      DELETE: Right.Destroy,
    }[method];
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (this.right === undefined) { this.right = this.rightForMethod(request.method); }

    return super.canActivate(context);
  }

  handleRequest(err: Error, user: any, info: Error) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token expired');
    }

    if (err) { throw err; }
    if (!user) { throw new UnauthorizedException(); }

    const authz = new Authorize({ user });

    if (authz.can(this.entity, this.right) === false) { throw new UnauthorizedException(); }

    return user;
  }
}
