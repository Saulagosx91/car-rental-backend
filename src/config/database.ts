import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

export const sequelize = new Sequelize({
  database: DB_NAME as string,
  username: DB_USER || 'root',
  password: DB_PASSWORD || '',
  host: DB_HOST || 'localhost',
  dialect: (DB_DIALECT as any) || 'mysql',
});
