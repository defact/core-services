import { Controller, Get } from '@nestjs/common';
import { Permission } from '../../common/claim';

interface PermissionDescriptor { id: string; name: string; }
interface PermissionsResponse { permissions: PermissionDescriptor[]; }

@Controller('permissions')
export class PermissionsController {
  @Get()
  async list(): Promise<PermissionsResponse> {
    const permissions = Object.keys(Permission)
    .filter(k => typeof Permission[k] === 'number')
    .map(k => ({ id: Permission[k], name: k.split(/(?=[A-Z])/).join(' ') }));

    return { permissions };
  }
}

export default PermissionsController;
