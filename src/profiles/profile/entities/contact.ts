import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Profile } from './profile';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @IsNotEmpty()
  classifier: string;

  @Column('simple-json', { default: '{}' })
  @IsNotEmpty()
  value: string;

  @ManyToOne(type => Profile, profile => profile.contacts)
  profile: Profile;
}
