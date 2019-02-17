import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm';
import { Role } from '../../roles/entities/role';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Group, Key } from '../../groups/entities/group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @Index({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ length: 32 })
  @IsNotEmpty()
  name: string;

  @Column({ length: 128 })
  @Exclude()
  password: string;

  @Column({ length: 128, nullable: true })
  @Exclude()
  verificationCode: string;

  @Column({ default: false })
  forceChangePassword: boolean;

  @Column({ default: false })
  isLocked: boolean;

  toggleLock() {
    this.isLocked = !this.isLocked;
  }

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  // @ManyToOne(type => Group)
  // group: Group;

  // @Column(type => Key)
  // key: Key;
}
