import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { Kafka } from 'kafkajs';
import 'reflect-metadata';
import CreateUserController from '../../../modules/users/useCases/CreateUserUseCase/CreateUserController';
// import kafka from '../../../modules/utils/kafka';
import createConnection from '../../../shared/infra/typeorm';
import '../../container';
// import { AppError } from '../../errors/AppError';
import router from './routes';

createConnection().then(() => {
  console.log("Database connected!");
});
const app = express();

app.use(express.json());

app.use(router);

// app.use( (err: Error, request: Request, response: Response, next: NextFunction) => {
//     if (err instanceof AppError) {
//       return response.status(err.statusCode).json({ message: err.message });
//     }

//     return response.status(500).json({
//       status: 'error',
//       message: `Internal server error - ${err.message}`,
//     });
//   }
// );

const kafka = new Kafka({
  clientId: 'ms-emails',
  brokers: ['kafka:29092']
});

const topicNormalUser = 'createuser';
const consumerNormalUser = kafka.consumer({ groupId: 'create-user' });
const creteUserController = new CreateUserController();

const producerUserCreated = kafka.producer();

async function createUser() {
  await consumerNormalUser.connect();
  await consumerNormalUser.subscribe({ topic: topicNormalUser, fromBeginning: false});    
  
  await consumerNormalUser.run({
    eachMessage: async ({topic, partition, message}) => {  
      const data = message.value.toString();
      const dataJson = JSON.parse(data);            
      console.log({topic, partition, dataJson});      
      const result = await creteUserController.handle(dataJson);
      
      await producerUserCreated.connect();
      await producerUserCreated.send({
        topic: 'usercreated',
        messages: [{value: JSON.stringify(result)}]
      });                               
    }    
  });  
  
  // producerUserCreated.disconnect();
}

createUser().then(() => {
  console.log("CONSUMER ESTÁ FUNCIONANDO!");
});


app.listen(3000, () => {
  console.log('Server started at port 3000.');  
});