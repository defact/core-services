import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
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

  @Column('json', { default: [] })
  claims: Claim[];
}
