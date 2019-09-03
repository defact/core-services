import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note';

@Injectable()
export class NoteEditService {
  constructor(
    @InjectRepository(Note)
    private readonly repository: Repository<Note>,
  ) {}

  async create(data: Note): Promise<Note> {
    data.recordedAt = new Date;

    if (data.date === undefined) data.date = data.recordedAt;
    if (data.tags === undefined) data.tags = [];

    return await this.repository.save(data);
  }

  async update(id: number, data: Partial<Note>): Promise<Note> {
    const note: Note = await this.repository.findOne(id);
    if (note === undefined) { return; }
    this.repository.merge(note, data);
    return this.repository.save(note);
  }

  async remove(id: number): Promise<Note> {
    return this.update(id, { isCancelled: true });
  }
}

export default NoteEditService;
