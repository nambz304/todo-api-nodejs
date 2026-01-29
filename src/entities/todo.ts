import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.js';


@Entity("todos")//table name
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;//chú ý: khởi tạo giá trị chỗ này là như thế nào

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
  @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })// onDelete: 'CASCADE' khi xoá user thì xoá tất cả todo của user đó
  @JoinColumn({ name: 'userId' })// chỉ định foreignn key - để link 2 table
  user?: User;

}