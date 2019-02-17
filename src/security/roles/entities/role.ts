import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export enum Right {
  Nothing = 0,
  Create = 1,
  Read = 2,
  Update = 4,
  Destroy = 8,
}

export enum Permission {
  None = Right.Nothing,
  ReadOnly = Right.Read,
  Editor = Right.Read | Right.Update,
  FullAccess = Right.Read | Right.Update | Right.Create | Right.Destroy,
}

export interface Claim { entity: string, right: Right };

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @Index({ unique: true })
  @IsNotEmpty()
  name: string;

  @Column('json', { default: [] })
  claims: Claim[];
}
