import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '../../container';

import { AppError } from '../../errors/AppError';
import createConnection from '../../../shared/infra/typeorm';

import router from './routes';
import { Kafka } from 'kafkajs';

createConnection().then(() => {
  console.log("Database connected!");
});

const app = express();

const kafka = new Kafka({
  clientId: 'ms-emails',
  brokers: ['kafka:29092']
});

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

const topicNormalUser = 'user_newbet';
const consumerNormalUser = kafka.consumer({ groupId: 'create-user' });




export { app };
