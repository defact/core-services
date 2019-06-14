import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users';
import { UserController } from './controllers/user';
import { RolesController } from './controllers/roles';
import { LockController } from './controllers/lock';
import { PasswordController } from './controllers/password';
import { VerificationCodeController } from './controllers/code';
import { UserFindService } from './services/find';
import { UserEditService } from './services/edit';
import { RolesService } from './services/roles';
import { GroupService } from './services/group';
import { UserLockService } from './services/lock';
import { PasswordService } from './services/password';
import { VerificationCodeService } from './services/code';
import { User } from './entities/user';
import { Role } from '../role/entities/role';
import { RoleModule } from '../role/module';
import { GroupModule } from '../group/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
    HttpModule.register({ timeout: 5000 }),
    RoleModule,
    GroupModule,
  ],
  controllers: [
    UsersController,
    UserController,
    RolesController,
    LockController,
    PasswordController,
    VerificationCodeController,
  ],
  providers: [
    UserFindService,
    UserEditService,
    RolesService,
    GroupService,
    UserLockService,
    PasswordService,
    VerificationCodeService,
  ],
  exports: [
    UserFindService,
    UserEditService,
  ],
})
export class UserModule {}
