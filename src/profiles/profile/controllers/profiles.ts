import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, ParseIntPipe, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { ClaimGuard, Entity } from '../../../security/common/claim';
import { ProfileFindService, ProfileQueryOptions } from '../services/find';
import { ProfileEditService } from '../services/edit';
import { Profile } from '../entities/profile';

interface ProfileResponse { profile: Profile; }
interface ProfilesResponse { profiles: Profile[]; }

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly finder: ProfileFindService,
    private readonly editor: ProfileEditService,
  ) {}

  @Post()
  @UseGuards(new ClaimGuard(Entity.Profile))
  async create(@Body() data: Profile): Promise<ProfileResponse> {
    const profile = await this.editor.create(data);
    return { profile };
  }

  @Get()
  @UseGuards(new ClaimGuard(Entity.Profile))
  async find(@Query() query: ProfileQueryOptions): Promise<ProfilesResponse> {
    const profiles = await this.finder.find(query);
    return { profiles };
  }

  @Get(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfileResponse> {
    const profile = await this.finder.findOne(id);
    if (profile === undefined) { throw new NotFoundException('Profile not found'); }
    return { profile };
  }

  @Put(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Profile): Promise<ProfileResponse> {
    const profile = await this.editor.update(id, data);
    return { profile };
  }

  @Patch(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async patch(@Param('id', ParseIntPipe) id: number, @Body() data: Profile): Promise<ProfileResponse> {
    const profile = await this.editor.update(id, data);
    return { profile };
  }

  @Delete(':id')
  @UseGuards(new ClaimGuard(Entity.Profile))
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ProfileResponse> {
    const profile = await this.editor.remove(id);
    return { profile };
  }
}

export default ProfilesController;
