import { Controller, Get, Post, Body, Query, UseGuards, UseInterceptors, FileInterceptor, UploadedFile  } from '@nestjs/common';
import { ClaimGuard, Entity, Right } from '../../../security/common/claim';

import { options } from '../../../common/s3';

import PhotoFindService, { PhotoQueryOptions } from '../services/find';
import PhotoEditService from '../services/edit';

import { Photo } from '../entities/photo';

interface PhotoResponse { photo: Photo; }
interface PhotosResponse { photos: Photo[]; }

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly finder: PhotoFindService,
    private readonly editor: PhotoEditService) {}

  @Get()
  // @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async list(@Query() query: PhotoQueryOptions): Promise<PhotosResponse> {
    const photos = await this.finder.find(query);
    return { photos };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', options))
  // @UseGuards(new ClaimGuard(Entity.Profile, Right.Update))
  async upload(@UploadedFile() file, @Body() data): Promise<PhotoResponse> {
    const photo = await this.editor.add({ ...data, owner: parseInt(data.owner), url: file.location });

    return { photo };
  }
}

export default PhotosController;