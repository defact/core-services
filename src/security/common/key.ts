import { Column, Index, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Index([ 'start', 'end' ])
export class Key {
  @Column({ default: 0 })
  @IsNotEmpty()
  start: number;

  @Column({ default: 9999 })
  @IsNotEmpty()
  end: number;

  static toWhere(props) {
    return { ...props, key: { start: MoreThanOrEqual(props.key.start), end: LessThanOrEqual(props.key.end) }};
  }
}
