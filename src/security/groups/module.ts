import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './controllers/groups';
import { GroupFindService } from './services/find';
import { GroupEditService } from './services/edit';
import { Group } from './entities/group';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
  ],
  controllers: [
    GroupsController,
  ],
  providers: [
    GroupFindService, 
    GroupEditService,
  ],
  exports: [
    GroupFindService,
    GroupEditService,
  ],
})
export class GroupsModule {}