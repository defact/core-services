import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  @IsNotEmpty()
  text: string;

  @Column({ default: false })
  isArchived: boolean;
}
