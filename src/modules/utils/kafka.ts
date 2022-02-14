import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: 'ms-emails',
  brokers: ['kafka:29092']
});

export default kafka;