import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Topic = 'compras' | 'casa' | 'trabajo' | 'familia';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  summary: string;

  @Column()
  topic: Topic;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  priority: Priority;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
