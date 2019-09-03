import { Module } from '@nestjs/common';
import { NoteModule } from './note/module';
import { TemplateModule } from './template/module';

@Module({
  imports: [
    NoteModule,
    TemplateModule,
  ],
})
export class NotesModule {}
