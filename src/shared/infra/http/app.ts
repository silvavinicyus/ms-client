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

const topicNormalUser = 'createuser';
const consumerNormalUser = kafka.consumer({ groupId: 'create-user' });
const creteUserController = new CreateUserController();

async function createUser() {
  await consumerNormalUser.connect();
  await consumerNormalUser.subscribe({ topic: topicNormalUser, fromBeginning: false});    

  await consumerNormalUser.run({
    eachMessage: async ({topic, partition, message}) => {      
      const data = message.value.toString();
      const dataJson = JSON.parse(data);      
      console.log(dataJson)

      const user = await creteUserController.handle(dataJson); 
      
      console.log(user);
    }    
  });  
}

createUser();

app.listen(3000, () => {
  console.log('Server started at port 3333.');  
});

