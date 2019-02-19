import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users';
import { UserController } from './controllers/user';
import { RolesController } from './controllers/roles';
import { LockController } from './controllers/lock';
import { PasswordController } from './controllers/password';
import { UserFindService } from './services/find';
import { UserEditService } from './services/edit';
import { RolesService } from './services/roles';
import { UserLockService } from './services/lock';
import { PasswordService } from './services/password';
import { User } from './entities/user';
import { Role } from '../role/entities/role';
import { RoleModule } from '../role/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
    HttpModule.register({ timeout: 5000 }),
    RoleModule,
  ],
  controllers: [
    UsersController, 
    UserController, 
    RolesController,
    LockController,
    PasswordController,
  ],
  providers: [
    UserFindService, 
    UserEditService, 
    RolesService,
    UserLockService,
    PasswordService,
  ],
  exports: [
    UserFindService,
    UserEditService,
  ]
})
export class UserModule {}