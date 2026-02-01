import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({//chú ý: lấy env không thành công
  type: 'postgres',
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
// let x = process.env.DB_HOST || 'db';
// let y = process.env.DB_USERNAME || 'root';
// console.log(x + " " + y + " " + process.env.DB_PASSWORD);

// ✅ Debug: Print env vars
console.log('=== Database Config ===');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('========================');

