import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { RoleModule } from './role/module';
import { GroupModule } from './group/module';
import { AuthenticationModule } from './authentication/module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    GroupModule,
    AuthenticationModule,
  ],
})
export class SecurityModule {}
