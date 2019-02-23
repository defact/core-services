import { Controller, Get } from '@nestjs/common';
import { Entity } from '../../common/claim';

interface EntityDescriptor { id: string; name: string; }
interface EntitiesResponse { entities: EntityDescriptor[]; }

@Controller('entities')
export class EntitiesController {
  @Get()
  async list(): Promise<EntitiesResponse> {
    return { entities: Object.keys(Entity).map(k => ({ id: Entity[k], name: k })) };
  }
}

export default EntitiesController;
