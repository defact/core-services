import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { User } from '../../user/entities/user';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
  ) {}

  generate(user: User): string {
    return this.jwt.sign(classToPlain(user));
  }
}

export default TokenService;
