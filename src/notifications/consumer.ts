// src/notifications/consumer.ts

import { connectToRabbitMQ } from '../config/rabbitmq';

export const receiveNotifications = async (): Promise<void> => {
  try {
    const { connection, channel } = await connectToRabbitMQ();
    const queue = 'deck-updates';

    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for notifications...');

    channel.consume(queue, (msg) => {
      if (msg) {
        console.log(`Received notification: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error receiving notification:', error);
  }
};
