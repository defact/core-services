import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Room } from '../entities/room';

export interface RoomQueryOptions {
  isArchived: boolean;
}

@Injectable()
export class RoomFindService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
  ) {}

  async findOne(id: number): Promise<Room> {
    return this.repository.findOne(id);
  }

  async find(query?: RoomQueryOptions): Promise<Room[]> {
    query = { ...query, isArchived: false };
    return this.repository.find({ where: query });
  }
}

export default RoomFindService;
