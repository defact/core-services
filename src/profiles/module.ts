import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/module';
import { ContactsModule } from './contacts/module';
import { PhotoModule } from './photo/module';

@Module({
  imports: [
    ProfileModule,
    ContactsModule,
    PhotoModule,
  ],
})
export class ProfilesModule {}
