import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room';

@Injectable()
export class RoomEditService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
  ) {}

  async create(data: Room): Promise<Room> {

    return await this.repository.save(data);
  }

  async update(id: number, data: Partial<Room>): Promise<Room> {
    const room: Room = await this.repository.findOne(id);
    if (room === undefined) { return; }
    this.repository.merge(room, data);
    return this.repository.save(room);
  }

  async remove(id: number): Promise<Room> {
    return this.update(id, { isArchived: true });
  }
}

export default RoomEditService;
