import { Module } from '@nestjs/common';
import { ContactClassifiersController } from './controllers/classifiers';

@Module({
  controllers: [
    ContactClassifiersController,
  ],
})
export class ContactsModule {}
