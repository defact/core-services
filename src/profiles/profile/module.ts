import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesController } from './controllers/profiles';
import { ProfileFindService } from './services/find';
import { ProfileEditService } from './services/edit';
import { ProfileGroupService } from './services/group';
import { Profile } from './entities/profile';
import { GroupModule } from '../../security/group/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    HttpModule.register({ timeout: 5000 }),
    GroupModule,
  ],
  controllers: [
    ProfilesController,
  ],
  providers: [
    ProfileFindService,
    ProfileEditService,
    ProfileGroupService,
  ],
  exports: [
    ProfileFindService,
    ProfileEditService,
  ],
})
export class ProfileModule {}
