import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../role/entities/role';
import { Key } from '../../common/key';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  @Index({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ length: 128 })
  @Exclude()
  password: string;

  @Column({ length: 128, nullable: true })
  @Exclude()
  verificationCode: string;

  @Expose()
  get isVerified() {
    return this.verificationCode === null;
  }

  @Column({ default: false })
  forceChangePassword: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  @Column(type => Key)
  key: Key;

  @Column({ default: false })
  isFixed: boolean;

  @Column({ default: false })
  isArchived: boolean;
}
