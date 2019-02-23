import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Access {
  @PrimaryColumn()
  user: number;

  @PrimaryColumn()
  profile: number;

  @Column({ default: false })
  isPrimary: boolean;
}
