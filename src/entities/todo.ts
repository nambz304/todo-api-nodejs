import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.js';


@Entity("todos")//table name
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true , nullable: true})
  name?: string;

  @Column({nullable: true})
  description?: string;

  @Column({ select: false , default: 'Not start'})
  status?: string;

  @Column({nullable: false})
  userId?: number; // ✅ Foreign key

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

    // ✅ Link tới User
  @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: User;

}