import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '../../container';

import { AppError } from '../../errors/AppError';
import createConnection from '../../../shared/infra/typeorm';

import router from './routes';
import kafka from '../../../modules/utils/kafka';
import CreateUserController from '../../../modules/users/useCases/CreateUserUseCase/CreateUserController';
import User from '../../../modules/users/entities/User';

createConnection().then(() => {
  console.log("Database connected!");
});

const app = express();

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

const topicNormalUser = 'user_lubycash';
const consumerNormalUser = kafka.consumer({ groupId: 'create-user' });
const creteUserController = new CreateUserController();

async function createUser() {
  await consumerNormalUser.connect();
  await consumerNormalUser.subscribe({ topic: topicNormalUser, fromBeginning: true}).then(() => {
    console.log("Subscribed");
  });

  let user: User;

  await consumerNormalUser.run({
    eachMessage: async ({topic, partition, message}) => {
      const data = message.value!.toString();
      const dataJson = JSON.parse(data);     

      console.log(dataJson);

      user = await creteUserController.handle(dataJson);

      console.log(user)
      
    }
  });

  return user;
}

createUser();



export { app };
