import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/module';
import { ContactsModule } from './contacts/module';

@Module({
  imports: [
    ProfileModule,
    ContactsModule,
  ],
})
export class ProfilesModule {}
