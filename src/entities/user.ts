import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Todo } from './todo.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: ['admin', 'user', 'guest'], default: 'user' })
  role?: 'admin' | 'user' | 'guest';

  @Column()
  todoId?: number[];
//   @OneToMany(() => Todo, (todo) => todo.user)
//   todos?: Todo[];
}