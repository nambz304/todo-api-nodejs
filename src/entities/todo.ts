import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("todos")//table name
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;//chú ý: khởi tạo giá trị chỗ này là như thế nào

  @Column({ unique: true })
  name?: string;

  @Column()
  description?: string;

  @Column({ select: false })
  status?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}