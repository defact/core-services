import { Injectable, NotFoundException } from '@nestjs/common';
import { Authenticator } from './authenticators/authenticator';
import { PasswordAuthenticator } from './authenticators/password';
import { CodeAuthenticator } from './authenticators/code';
import { TokenService } from './token';
import { Session } from '../interfaces/session';
import { User } from '../../user/entities/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly password: PasswordAuthenticator,
    private readonly code: CodeAuthenticator,
    private readonly token: TokenService,
  ) {}

  async signOn(session: Session): Promise<string> {
    const authenticator: Authenticator = {
      password: this.password,
      code: this.code,
    }[session.strategy || 'password'];

    const user: User = await authenticator.verify(session);

    if (user === undefined || user.isLocked) { throw new NotFoundException('Invalid credentials'); }

    return this.token.generate(user);
  }
}

export default AuthenticationService;
