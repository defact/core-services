import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entities/photo';

export interface PhotoQueryOptions {
  owner: number;
}

@Injectable()
export class PhotoFindService {
  constructor(
    @InjectRepository(Photo)
    private readonly repository: Repository<Photo>,
  ) {}

  async findOne(id: number): Promise<Photo> {
    return this.repository.findOne(id);
  }

  async find(query?: PhotoQueryOptions): Promise<Photo[]> {
    return this.repository.find({ where: query });
  }
}

export default PhotoFindService;
