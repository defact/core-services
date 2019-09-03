import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Key } from '../../../security/common/key';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @IsNotEmpty()
  name: string;

  @Column({ default: false })
  isArchived: boolean;

  @Column(type => Key)
  key: Key;
}
