import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024 })
  @IsNotEmpty()
  text: string;

  @Column('simple-array')
  tags: string[];
}
