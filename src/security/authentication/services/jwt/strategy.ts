import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/configuration/service';
import { User } from '../../../user/entities/user';

const config: ConfigurationService = new ConfigurationService();
const key: string = config.get('authentication:jwt:key');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: key,
    });
  }

  validate(payload: User) {
    return plainToClass(User, payload);
  }
}

export default JwtStrategy;