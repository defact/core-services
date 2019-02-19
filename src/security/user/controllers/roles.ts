import { Controller, Post, Delete, Body, Param, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ClaimGuard } from '../../../common/guards/claim';
import { RolesService } from '../services/roles';
import { User } from '../entities/user';
import { Right } from '../../common/claim';

interface UserResponse { user: User };

@Controller('users/:id/roles')
export class RolesController {
  constructor(private readonly roles: RolesService) {}

  @Post()
  // @UseGuards(new ClaimGuard('user', Right.Update))
  async create(@Param('id', ParseIntPipe) id: number, @Body() role: any) : Promise<UserResponse> {
    const user = await this.roles.add(id, role.id);
    if (user === undefined) throw new NotFoundException('User not found');
    return { user };
  }

  @Delete('/:role')
  @UseGuards(new ClaimGuard('user', Right.Update))
  async remove(@Param('id', ParseIntPipe) id: number, @Param('role', ParseIntPipe) role: number) : Promise<UserResponse> {
    const user = await this.roles.remove(id, role);
    if (user === undefined) throw new NotFoundException('User not found');
    return { user };
  }
}

export default RolesController;