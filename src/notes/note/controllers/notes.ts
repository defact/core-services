import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../../security/common/claim';
import { NoteFindService, NoteQueryOptions } from '../services/find';
import { NoteEditService } from '../services/edit';
import { Note } from '../entities/note';

interface NoteResponse { note: Note; }
interface NotesResponse { notes: Note[]; }

@Controller('notes')
export class NotesController {
  constructor(
    private readonly finder: NoteFindService,
    private readonly editor: NoteEditService,
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async create(@Body() data: Note): Promise<NoteResponse> {
    const note = await this.editor.create(data);
    return { note };
  }

  @Get()
  @UseGuards(new ClaimGuard(Entity.Profile))
  async find(@Query() query: NoteQueryOptions): Promise<NotesResponse> {
    const notes = await this.finder.find(query);
    return { notes };
  }

  @Get(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NoteResponse> {
    const note = await this.finder.findOne(id);
    if (note === undefined) { throw new NotFoundException('Note not found'); }
    return { note };
  }

  @Put(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Note): Promise<NoteResponse> {
    const note = await this.editor.update(id, data);
    return { note };
  }

  @Patch(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Note): Promise<NoteResponse> {
    const note = await this.editor.update(id, data);
    return { note };
  }

  @Delete(':id')
  @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async remove(@Param('id', ParseIntPipe) id: number): Promise<NoteResponse> {
    const note = await this.editor.remove(id);
    return { note };
  }
}

export default NotesController;
