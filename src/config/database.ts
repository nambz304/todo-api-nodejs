import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
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



