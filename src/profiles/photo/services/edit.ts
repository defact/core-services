import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoFindService } from './find';
import { Photo } from '../entities/photo';
import { classToPlain } from 'class-transformer';

@Injectable()
export class PhotoEditService {
  constructor(
    @InjectRepository(Photo)
    private readonly repository: Repository<Photo>,
    private readonly finder: PhotoFindService,
  ) {}

  async add(photo: Photo): Promise<Photo> {
    return this.repository.save(photo);
  }

  async update(pid: number, data: Photo): Promise<Photo> {
    const photo: Photo = await this.finder.findOne(pid);

    if (photo === undefined) { return; }

    this.repository.merge(photo, data);
    return this.repository.save(photo);
  }

  async remove(pid: number): Promise<void> {
    const photo = await this.finder.findOne(pid);

    if (photo === undefined) { return; }

    await this.repository.delete(pid);
  }
}

export default PhotoEditService;
