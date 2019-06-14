import { Module } from '@nestjs/common';
import { NoteModule } from './note/module';

@Module({
  imports: [
    NoteModule,
  ],
})
export class NotesModule {}
