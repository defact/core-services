import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './controllers/photos';
import { PhotoFindService } from './services/find';
import { PhotoEditService } from './services/edit';
import { Photo } from './entities/photo';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
  ],
  controllers: [
    PhotosController,
  ],
  providers: [
    PhotoFindService,
    PhotoEditService,
  ]
})
export class PhotoModule {}
