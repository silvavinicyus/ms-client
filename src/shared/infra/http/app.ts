import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import User from '../../../modules/users/entities/User';
import CreateUserController from '../../../modules/users/useCases/CreateUserUseCase/CreateUserController';
import kafka from '../../../modules/utils/kafka';
import createConnection from '../../../shared/infra/typeorm';
import '../../container';
import HTTP from '../../../modules/utils/axios';

createConnection().then(() => {
  console.log("Database connected!");
});
const app = express();

const topicNormalUser = 'createuser';
const consumerNormalUser = kafka.consumer({ groupId: 'create-user' });
const creteUserController = new CreateUserController();

const producerUserCreated = kafka.producer();


async function createUser() {
  await consumerNormalUser.connect();
  await consumerNormalUser.subscribe({ topic: topicNormalUser, fromBeginning: false});    
  await producerUserCreated.connect();

  await consumerNormalUser.run({
    eachMessage: async ({topic, partition, message}) => {      
      const data = message.value.toString();
      const dataJson = JSON.parse(data);

      const result = await creteUserController.handle(dataJson);     

      if(!result.error) {
        console.log("Entrou na que não tem erro!");
        await producerUserCreated.send({
          topic: 'usercreated',
          messages: [{value: JSON.stringify(result)}]
        });      
        producerUserCreated.disconnect();
      } else {
        console.log('\n\n\n\n');
        console.log("entrou na que tem erro");
        console.log(result);
      }

      //TO-DO email thing
    }
  });  
}

createUser();

app.listen(3000, () => {
  console.log('Server started at port 3333.');  
});