import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './controllers/notes';
import { NoteFindService } from './services/find';
import { NoteEditService } from './services/edit';
import { Note } from './entities/note';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    HttpModule.register({ timeout: 5000 }),
  ],
  controllers: [
    NotesController,
  ],
  providers: [
    NoteFindService,
    NoteEditService,
  ],
  exports: [

  ],
})
export class NoteModule {}
