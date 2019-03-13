import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { RoleFindService } from '../services/find';
import { RoleEditService } from '../services/edit';
import { Role } from '../entities/role';

interface RoleResponse { role: Role; }
interface RolesResponse { roles: Role[]; }

@Controller('roles')
export class RolesController {
  constructor(
    private readonly finder: RoleFindService,
    private readonly editor: RoleEditService,
  ) {}

  @Post()
  async create(@Body() data: Role): Promise<RoleResponse> {
    const role = await this.editor.create(data);
    return { role };
  }

  @Get()
  async find(): Promise<RolesResponse> {
    const roles = await this.finder.find();
    return { roles };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleResponse> {
    const role = await this.finder.findOne(id);
    if (role === undefined) { throw new NotFoundException('Role not found'); }
    return { role };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Role): Promise<RoleResponse> {
    const role = await this.editor.update(id, data);
    if (role === undefined) { throw new NotFoundException('Role not found'); }
    return { role };
  }

  @Patch(':id')
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Role): Promise<RoleResponse> {
    const role = await this.editor.update(id, data);
    if (role === undefined) { throw new NotFoundException('Role not found'); }
    return { role };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<RoleResponse> {
    const role = await this.editor.remove(id);
    return { role };
  }
}

export default RolesController;
