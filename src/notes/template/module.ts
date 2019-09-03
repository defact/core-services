import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './controllers/templates';
import { TemplateFindService } from './services/find';
import { TemplateEditService } from './services/edit';
import { Template } from './entities/template';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]),
    HttpModule.register({ timeout: 5000 }),
  ],
  controllers: [
    TemplatesController,
  ],
  providers: [
    TemplateFindService,
    TemplateEditService,
  ],
  exports: [

  ],
})
export class TemplateModule {}
