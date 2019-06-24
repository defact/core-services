import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @IsNotEmpty()
  caption: string;

  @Column({ length: 128 })
  @IsNotEmpty()
  url: string;

  @Column()
  owner: number;
}
