import { Module } from '@nestjs/common';
import { UsersModule } from './users/module';
import { RolesModule } from './roles/module';
import { GroupsModule } from './groups/module';
import { SessionsModule } from './sessions/module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    GroupsModule,
    SessionsModule,
  ],
})
export class SecurityModule {}
