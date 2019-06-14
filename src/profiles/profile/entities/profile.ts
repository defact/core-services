import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Key } from '../../../security/common/key';
import { Contact } from './contact';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ length: 32, nullable: true })
  classifier: string;

  @Column(type => Key)
  key: Key;

  @Column('simple-json', { default: '{}' })
  data: any;

  @OneToMany(type => Contact, contact => contact.profile)
  contacts: Contact[];
  
  @Column({ default: false })
  isFixed: boolean;

  @Column({ default: false })
  isArchived: boolean;
}
