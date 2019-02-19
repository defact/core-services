import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/module';

@Module({
  imports: [
    ProfileModule,
  ],
})
export class ProfilesModule {}
