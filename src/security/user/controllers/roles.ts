import { Controller, Post, Delete, Body, Param, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../common/claim';
import { RolesService } from '../services/roles';
import { User } from '../entities/user';

interface UserResponse { user: User; }

@Controller('users/:id/roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Post()
  @UseGuards(new ClaimGuard(Entity.User, Right.Update))
  async create(@Param('id', ParseIntPipe) id: number, @Body() role: any): Promise<UserResponse> {
    const user = await this.roles.add(id, role.id);
    if (user === undefined) { throw new NotFoundException('User not found'); }
    return { user };
  }

  @Delete('/:role')
  @UseGuards(new ClaimGuard(Entity.User, Right.Update))
  async remove(@Param('id', ParseIntPipe) id: number, @Param('role', ParseIntPipe) role: number): Promise<UserResponse> {
    const user = await this.roles.remove(id, role);
    if (user === undefined) { throw new NotFoundException('User not found'); }
    return { user };
  }
}

export default RolesController;
