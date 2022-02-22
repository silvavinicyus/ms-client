import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { Kafka } from 'kafkajs';
import 'reflect-metadata';
import CreateUserController from '../../../modules/users/useCases/CreateUserUseCase/CreateUserController';
import createConnection from '../../../shared/infra/typeorm';
import '../../container';
import Mailer from '../../utils/Mail';
import router from './routes';

createConnection().then(() => {
  console.log("Database connected!");
});
const app = express();

app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log('Server started at port 3000.');  
});

const kafka = new Kafka({
  clientId: 'ms-emails',
  brokers: ['kafka:29092']
});

const topicNormalUser = 'createuser';
const consumerNormalUser = kafka.consumer({ groupId: 'create-user' });
const creteUserController = new CreateUserController();

const producerUserCreated = kafka.producer();

const mailer = new Mailer();

async function createUser() {
  await consumerNormalUser.connect();
  await consumerNormalUser.subscribe({ topic: topicNormalUser, fromBeginning: false});    
  
  await consumerNormalUser.run({
    eachMessage: async ({topic, partition, message}) => {  
      const data = message.value.toString();
      const dataJson = JSON.parse(data);                      
      const result = await creteUserController.handle(dataJson);
      
      await producerUserCreated.connect();
      await producerUserCreated.send({
        topic: 'usercreated',
        messages: [{value: JSON.stringify(result)}]
      });

      await mailer.sendMail({
        status: result.user.status,
        email: result.user.email,
        name: result.user.full_name,
      });
    }    
  });  
  
  // producerUserCreated.disconnect();
}

createUser().then(() => {
  console.log("CONSUMER ESTÁ FUNCIONANDO!");
});