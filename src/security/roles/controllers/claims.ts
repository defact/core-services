import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ClaimsService } from '../services/claims';
import { Claim, Role } from '../../roles/entities/role';

interface RoleResponse { role: Role };

@Controller('roles/:id/claims')
export class ClaimsController {
  constructor(private readonly claims: ClaimsService) {}

  @Post()
  async create(@Param('id', ParseIntPipe) id: number, @Body() claim: Claim) : Promise<RoleResponse> {
    const role = await this.claims.set(id, claim);
    if (role === undefined) throw new NotFoundException('Role not found');
    return { role };
  }

  @Delete('/:entity')
  async remove(@Param('id', ParseIntPipe) id: number, @Param('entity') entity: string) : Promise<RoleResponse> {
    const role = await this.claims.remove(id, entity);
    if (role === undefined) throw new NotFoundException('Role not found');
    return { role };
  }
}

export default ClaimsController;