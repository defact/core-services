import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionController } from './controllers/session';
import { SessionsController } from './controllers/sessions';
import { TokenService } from './services/token';
import { AuthenticationService } from './services/authentication';
import { PasswordAuthenticator } from './services/authenticators/password';
import { CodeAuthenticator } from './services/authenticators/code';
import { UserModule } from '../user/module';
import { JwtStrategy } from './services/jwt/strategy';
import { ConfigurationService } from '../../configuration/service';

const config = new ConfigurationService();

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: config.get('authentication:jwt:key'),
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  controllers: [
    SessionController,
    SessionsController,
  ],
  providers: [
    AuthenticationService,
    PasswordAuthenticator,
    CodeAuthenticator,
    TokenService,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
