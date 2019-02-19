import { Column, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class Key {
  @Column({ default: 0 })
  @Index()
  @IsNotEmpty()
  start: number;

  @Column({ default: 9999 })
  @Index()
  @IsNotEmpty()
  end: number;
}
