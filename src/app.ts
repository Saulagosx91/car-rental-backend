import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelize } from './config/database';
import './models';
import router from './routes';
import { corsConfig } from './config/cors';

const app = express();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use('/uploads', express.static('uploads/'));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('<h1>Hello Server!</h1>');
});

export default app;
