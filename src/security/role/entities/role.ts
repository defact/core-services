import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Claim } from '../../common/claim';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  @Index({ unique: true })
  @IsNotEmpty()
  name: string;

  @Column('simple-json', { default: '[]' })
  claims: Claim[];

  @Column({ default: false })
  isFixed: boolean;

  @Column({ default: false })
  isArchived: boolean;
}
