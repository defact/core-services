import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  @IsEmail()
  @IsNotEmpty()
  from: string;

  @Column({ length: 512 })
  message: string;

  @Column({ length: 128 })
  subject: string;

  @Column()
  sentAt: Date;
}
