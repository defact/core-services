import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../../security/common/claim';
import { TemplateFindService } from '../services/find';
import { TemplateEditService } from '../services/edit';
import { Template } from '../entities/template';

interface TemplateResponse { template: Template; }
interface TemplatesResponse { templates: Template[]; }

@Controller('templates')
export class TemplatesController {
  constructor(
    private readonly finder: TemplateFindService,
    private readonly editor: TemplateEditService,
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async create(@Body() data: Template): Promise<TemplateResponse> {
    const template = await this.editor.create(data);
    return { template };
  }

  @Get()
  @UseGuards(new ClaimGuard(Entity.Profile))
  async find(): Promise<TemplatesResponse> {
    const templates = await this.finder.find();
    return { templates };
  }

  @Get(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TemplateResponse> {
    const template = await this.finder.findOne(id);
    if (template === undefined) { throw new NotFoundException('Template not found'); }
    return { template };
  }

  @Put(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Template): Promise<TemplateResponse> {
    const template = await this.editor.update(id, data);
    return { template };
  }

  @Patch(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Template): Promise<TemplateResponse> {
    const template = await this.editor.update(id, data);
    return { template };
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async remove(@Param('id', ParseIntPipe) id: number) : Promise<void> {
    await this.editor.remove(id);
  }
}

export default TemplatesController;
