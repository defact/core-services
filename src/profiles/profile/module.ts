import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesController } from './controllers/profiles';
import { ProfileContactsController } from './controllers/contacts';
import { ProfileFindService } from './services/find';
import { ProfileEditService } from './services/edit';
import { ProfileContactsService } from './services/contacts';
import { ProfileGroupService } from './services/group';
import { Profile } from './entities/profile';
import { Contact } from './entities/contact';
import { GroupModule } from '../../security/group/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    TypeOrmModule.forFeature([Contact]),
    HttpModule.register({ timeout: 5000 }),
    GroupModule,
  ],
  controllers: [
    ProfilesController,
    ProfileContactsController,
  ],
  providers: [
    ProfileFindService,
    ProfileEditService,
    ProfileGroupService,
    ProfileContactsService,
  ],
  exports: [
    ProfileFindService,
    ProfileEditService,
  ],
})
export class ProfileModule {}
