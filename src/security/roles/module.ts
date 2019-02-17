import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles';
import { ClaimsController } from './controllers/claims';
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
export class RolesModule {}