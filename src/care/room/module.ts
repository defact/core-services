import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './controllers/rooms';
import { RoomFindService } from './services/find';
import { RoomEditService } from './services/edit';
import { Room } from './entities/room';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    HttpModule.register({ timeout: 5000 }),
  ],
  controllers: [
    RoomsController,
  ],
  providers: [
    RoomFindService,
    RoomEditService,
  ],
  exports: [

  ],
})
export class RoomModule {}
