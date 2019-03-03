import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipController } from './controllers/membership';
import { MembershipsController } from './controllers/memberships';
import { MembershipRegistrationService } from './services/register';
import { MembershipProfileUsersController } from './controllers/users';
import { MembershipUserProfilesController } from './controllers/profiles';
import { MembershipUserProfilesService } from './services/profiles';
import { MembershipProfileUsersService } from './services/users';
import { EmailRegistrationService } from './services/email';
import { Access } from './entities/access';
import { ProfileModule } from '../profiles/profile/module';
import { UserModule } from '../security/user/module';
import { ContactModule } from '../contact/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Access]),
    UserModule,
    ProfileModule,
    ContactModule,
  ],
  controllers: [
    MembershipController,
    MembershipsController,
    MembershipProfileUsersController,
    MembershipUserProfilesController,
  ],
  providers: [
    MembershipRegistrationService,
    MembershipProfileUsersService,
    MembershipUserProfilesService,
    EmailRegistrationService,
  ],
})
export class MembershipModule {}
