import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({//chú ý: lấy env không thành công
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'nam123456!',
  database: process.env.DB_NAME || 'todo_db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: ["dist/entities/*.js"],
  migrations: ['dist/migrations/*.js'],
  subscribers: [],
});
// let x = process.env.DB_PORT || '3306';
// let y = process.env.DB_USERNAME || 'root';
// console.log(x + " " + y + " " + process.env.DB_PASSWORD);

