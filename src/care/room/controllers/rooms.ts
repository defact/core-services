import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../../security/common/claim';
import { RoomFindService, RoomQueryOptions } from '../services/find';
import { RoomEditService } from '../services/edit';
import { Room } from '../entities/room';

interface RoomResponse { room: Room; }
interface RoomsResponse { rooms: Room[]; }

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly finder: RoomFindService,
    private readonly editor: RoomEditService,
  ) {}

  @Post()
  // @UseGuards(new ClaimGuard(Entity.Group, Right.Update))
  async create(@Body() data: Room): Promise<RoomResponse> {
    const room = await this.editor.create(data);
    return { room };
  }

  @Get()
  @UseGuards(new ClaimGuard(Entity.Group))
  async find(@Query() query: RoomQueryOptions): Promise<RoomsResponse> {
    const rooms = await this.finder.find(query);
    return { rooms };
  }

  @Get(':id')
  @UseGuards(new ClaimGuard(Entity.Group))
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RoomResponse> {
    const room = await this.finder.findOne(id);
    if (room === undefined) { throw new NotFoundException('Room not found'); }
    return { room };
  }

  @Put(':id')
  @UseGuards(new ClaimGuard(Entity.Group))
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Room): Promise<RoomResponse> {
    const room = await this.editor.update(id, data);
    return { room };
  }

  @Patch(':id')
  @UseGuards(new ClaimGuard(Entity.Group))
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Room): Promise<RoomResponse> {
    const room = await this.editor.update(id, data);
    return { room };
  }

  @Delete(':id')
  @UseGuards(new ClaimGuard(Entity.Group, Right.Update))
  async remove(@Param('id', ParseIntPipe) id: number): Promise<RoomResponse> {
    const room = await this.editor.remove(id);
    return { room };
  }
}

export default RoomsController;
