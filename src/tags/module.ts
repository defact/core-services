import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsController } from './controllers/tags';
import { TagFindService } from './services/find';
import { TagEditService } from './services/edit';
import { Tag } from './entities/tag';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    HttpModule.register({ timeout: 5000 }),
  ],
  controllers: [
    TagsController,
  ],
  providers: [
    TagFindService,
    TagEditService,
  ],
  exports: [

  ],
})
export class TagsModule {}
