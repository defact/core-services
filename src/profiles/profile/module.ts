import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesController } from './controllers/profiles';
import { ProfileFindService } from './services/find';
import { ProfileEditService } from './services/edit';
import { Profile } from './entities/profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    HttpModule.register({ timeout: 5000 }),
  ],
  controllers: [
    ProfilesController, 
  ],
  providers: [
    ProfileFindService, 
    ProfileEditService, 
  ],
  exports: [
    ProfileFindService,
    ProfileEditService,
  ]
})
export class ProfileModule {}