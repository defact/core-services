import { Controller, Post, Param, ParseIntPipe, UseGuards, NotFoundException, Body, Delete, HttpCode } from '@nestjs/common';
import { ClaimGuard } from '../../../common/guards/claim';
import { PasswordService } from '../services/password';
import { User } from '../entities/user';
import { Right } from '../../roles/entities/role';
import { Password } from '../dto/password';

interface UserResponse { user: User };

@Controller('users/:id/password')
export class PasswordController {
  constructor(private readonly password: PasswordService) {}

  @Post()
  @UseGuards(new ClaimGuard('user', Right.Update))
  async change(@Param('id', ParseIntPipe) id: number, @Body() password: Password) : Promise<UserResponse> {
    const user = await this.password.change(id, password);
    if (user === undefined) throw new NotFoundException('User not found');
    return { user };
  }

  @Delete()
  @HttpCode(204)
  // @UseGuards(new ClaimGuard('user', Right.Update))
  async reset(@Param('id', ParseIntPipe) id: number) : Promise<void> {
    const user = await this.password.reset(id);
    if (user === undefined) throw new NotFoundException('User not found');
  }
}

export default PasswordController;