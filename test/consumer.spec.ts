import { receiveNotifications } from '../src/notifications/consumer';
import * as amqp from 'amqplib';

// Mock para a biblioteca amqplib
jest.mock('amqplib');

describe('Consumer Tests', () => {
  let mockConsume: jest.Mock;

  beforeAll(() => {
    // Configuração do mock para a função consume do amqplib
    mockConsume = jest.fn();
    (amqp.connect as jest.Mock).mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue({
        assertQueue: jest.fn().mockResolvedValue(undefined),
        consume: mockConsume,
        ack: jest.fn(),
        close: jest.fn(),
      }),
    });
  });

  it('should consume a notification from the queue', async () => {
    const fakeMessage = { content: Buffer.from('Notification received!') };

    // Simula a função de consumir mensagens
    mockConsume.mockImplementationOnce((queue, callback) => {
      callback(fakeMessage);
    });

    await receiveNotifications();

    // Verifica se a mensagem foi consumida
    expect(mockConsume).toHaveBeenCalled();
  });
});
