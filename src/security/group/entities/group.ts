import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Key } from '../../common/key';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @Index({ unique: true })
  @IsNotEmpty()
  name: string;

  @Column(type => Key)
  key: Key;

  @ManyToOne(type => Group, group => group.children)
  parent: Group;

  @OneToMany(type => Group, group => group.parent)
  children: Group[];

  @Column({ default: false })
  isFixed: boolean;

  @Column({ default: false })
  isArchived: boolean;
}
