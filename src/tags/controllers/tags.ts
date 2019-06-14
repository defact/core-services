import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../security/common/claim';
import { TagFindService, TagQueryOptions } from '../services/find';
import { TagEditService } from '../services/edit';
import { Tag } from '../entities/tag';

interface TagResponse { tag: Tag; }
interface TagsResponse { tags: Tag[]; }

@Controller('tags')
export class TagsController {
  constructor(
    private readonly finder: TagFindService,
    private readonly editor: TagEditService,
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard(Entity.User))
  async create(@Body() data: Tag): Promise<TagResponse> {
    const tag = await this.editor.create(data);
    return { tag };
  }

  @Get()
  // @UseGuards(new ClaimGuard(Entity.User))
  async find(@Query() query: TagQueryOptions): Promise<TagsResponse> {
    const tags = await this.finder.find(query);
    return { tags };
  }

  @Get(':id')
  // @UseGuards(new ClaimGuard(Entity.User))
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TagResponse> {
    const tag = await this.finder.findOne(id);
    if (tag === undefined) { throw new NotFoundException('Tag not found'); }
    return { tag };
  }

  @Put(':id')
  // @UseGuards(new ClaimGuard(Entity.User))
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Tag): Promise<TagResponse> {
    const tag = await this.editor.update(id, data);
    return { tag };
  }

  @Patch(':id')
  // @UseGuards(new ClaimGuard(Entity.User))
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Tag): Promise<TagResponse> {
    const tag = await this.editor.update(id, data);
    return { tag };
  }

  @Delete(':id')
  // @UseGuards(new ClaimGuard(Entity.User))
  async remove(@Param('id', ParseIntPipe) id: number): Promise<TagResponse> {
    const tag = await this.editor.remove(id);
    return { tag };
  }
}

export default TagsController;
