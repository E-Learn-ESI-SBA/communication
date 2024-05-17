import "fastify";

import type * as firebase from "firebase-admin";
import { Consumer, Kafka, Producer } from "kafkajs";
import { UserClaims } from "./config.ts";
declare module "fastify" {
  interface FastifyInstance {
    firebase: firebase.app.App;
    kafka: Kafka;
    consumer: Consumer;
    producer: Producer;
    config: {
      MONGO_URI: string;
      KAFKA_BROKER: string;
      KAFKA_GROUP_ID: string;
      KAFKA_TOPIC: string;
      JWT_SECRET: string;
      NODE_ENV: string;
    };
  }
  interface FastifyRequest {
    user: UserClaims;
  }
}