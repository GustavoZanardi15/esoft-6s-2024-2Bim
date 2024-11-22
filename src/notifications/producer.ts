import { connectToRabbitMQ } from '../config/rabbitmq';


console.log("Producer está rodando");


export const sendNotification = async (message: string): Promise<void> => {
  let connection: any; // Alterne para o tipo correto se disponível.
  let channel: any;

  try {
    const rabbitMQ = await connectToRabbitMQ();
    connection = rabbitMQ.connection;
    channel = rabbitMQ.channel;
    const queue = 'deck-updates';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`Notification Sent: ${message}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  } finally {
    try {
      if (channel) await channel.close();
      if (connection) await connection.close();
    } catch (closeError) {
      console.error('Error closing RabbitMQ resources:', closeError);
    }
  }
  
};
