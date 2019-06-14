import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Profile } from '../../../profiles/profile/entities/profile';
import { User } from '../../../security/user/entities/user';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024 })
  @IsNotEmpty()
  text: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  date: Date;

  @Column()
  recordedAt: Date;

  @ManyToOne(type => User)
  recordedBy: User;

  @ManyToOne(type => Profile)
  profile: Profile;

  @Column({ default: false })
  isCancelled: boolean;

  @Column()
  cancelledAt: Date;

  @ManyToOne(type => User)
  cancelledBy: User;
}
