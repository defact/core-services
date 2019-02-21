import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, UseGuards, NotFoundException } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../common/claim';
import { UserFindService } from '../services/find';
import { UserEditService } from '../services/edit';
import { User } from '../entities/user';

interface UserResponse { user: User };
interface UsersResponse { users: User[] };

@Controller('users')
export class UsersController {
  constructor(
    private readonly finder: UserFindService,
    private readonly editor: UserEditService
  ) {}

  @Post()
  @UseGuards(new ClaimGuard(Entity.User))
  async create(@Body() data: User) : Promise<UserResponse> {
    const user = await this.editor.create(data);
    return { user };
  }

  @Get()
  @UseGuards(new ClaimGuard(Entity.User))
  async find(): Promise<UsersResponse> {
    const users = await this.finder.find();
    return { users };
  }

  @Get(':id')
  @UseGuards(new ClaimGuard(Entity.User))
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponse> {
    const user = await this.finder.findOne(id);
    if (user === undefined) throw new NotFoundException('User not found');
    return { user };
  }

  @Put(':id')
  @UseGuards(new ClaimGuard(Entity.User))
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: User): Promise<UserResponse> {
    const user = await this.editor.update(id, data);
    return { user };
  }

  @Patch(':id')
  @UseGuards(new ClaimGuard(Entity.User))
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: User): Promise<UserResponse> {
    const user = await this.editor.update(id, data);
    return { user };
  }

  @Delete(':id')
  @UseGuards(new ClaimGuard(Entity.User))
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.editor.remove(id);
  }
}

export default UsersController;