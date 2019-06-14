import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/module';
import { ProfilesModule } from '../profiles/module';
import { MembershipModule } from '../membership/module';
import { SetupService } from './setup';

@Module({
  imports: [
    SecurityModule,
    MembershipModule,
    ProfilesModule,
  ],
  providers: [
    SetupService,
  ],
})
export class SetupModule {}
