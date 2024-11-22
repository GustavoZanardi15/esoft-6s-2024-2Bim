import * as amqp from 'amqplib';

export const connectToRabbitMQ = async (): Promise<{ connection: amqp.Connection, channel: amqp.Channel }> => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};
