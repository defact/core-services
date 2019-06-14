import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Note } from '../entities/note';

export interface NoteQueryOptions {
  isCancelled: boolean;
  profile: number;
}

@Injectable()
export class NoteFindService {
  constructor(
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
  ) {}

  async findOne(id: number): Promise<Note> {
    return this.repository.findOne(id);
  }

  async find(query?: NoteQueryOptions): Promise<Note[]> {
    query = { ...query, isCancelled: false };
    return this.repository.find({ where: query });
  }
}

export default NoteFindService;
