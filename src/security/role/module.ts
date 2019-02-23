import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles';
import { ClaimsController } from './controllers/claims';
import { EntitiesController } from './controllers/entities';
import { PermissionsController } from './controllers/permissions';
import { RoleFindService } from './services/find';
import { RoleEditService } from './services/edit';
import { ClaimsService } from './services/claims';
import { Role } from './entities/role';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [
    RolesController,
    ClaimsController,
    EntitiesController,
    PermissionsController,
  ],
  providers: [
    RoleFindService,
    RoleEditService,
    ClaimsService,
  ],
  exports: [
    RoleFindService,
    RoleEditService,
  ],
})
export class RoleModule {}
