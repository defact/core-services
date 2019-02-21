import { Column, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Index([ 'start', 'end' ])
export class Key {
  @Column({ default: 0 })
  @IsNotEmpty()
  start: number;

  @Column({ default: 9999 })
  @IsNotEmpty()
  end: number;
}
