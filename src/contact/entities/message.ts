import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 128 })
  @IsEmail()
  @IsNotEmpty()
  from: string;

  @Column({ length: 128 })
  @IsOptional()
  @IsEmail()
  to: string;

  @Column({ length: 512 })
  message: string;

  @Column({ length: 128 })
  subject: string;

  @Column()
  @IsDate()
  @IsOptional()
  sentAt?: Date;
}
