import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  hashPassword: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
