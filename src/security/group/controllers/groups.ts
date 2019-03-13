import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { GroupFindService, GroupQueryOptions } from '../services/find';
import { GroupEditService } from '../services/edit';
import { Group } from '../entities/group';

interface GroupResponse { group: Group; }
interface GroupsResponse { groups: Group[]; }

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly finder: GroupFindService,
    private readonly editor: GroupEditService,
  ) {}

  @Post()
  async create(@Body() data: Group): Promise<GroupResponse> {
    const group = await this.editor.create(data);
    return { group };
  }

  @Get()
  async find(@Query() query: GroupQueryOptions): Promise<GroupsResponse> {
    const groups = await this.finder.find(query);
    return { groups };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GroupResponse> {
    const group = await this.finder.findOne(id);
    if (group === undefined) { throw new NotFoundException('Group not found'); }
    return { group };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Group): Promise<GroupResponse> {
    const group = await this.editor.update(id, data);
    if (group === undefined) { throw new NotFoundException('Group not found'); }
    return { group };
  }

  @Patch(':id')
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Group): Promise<GroupResponse> {
    const group = await this.editor.update(id, data);
    if (group === undefined) { throw new NotFoundException('Group not found'); }
    return { group };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<GroupResponse> {
    const group = await this.editor.remove(id);
    return { group };
  }
}

export default GroupsController;
