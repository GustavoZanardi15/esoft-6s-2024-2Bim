import { sendNotification } from '../src/notifications/producer';
import * as amqp from 'amqplib';

// Mock para a biblioteca amqplib
jest.mock('amqplib');

describe('Producer Tests', () => {
  let mockSendToQueue: jest.Mock;

  beforeAll(() => {
    // Configuração do mock para a função sendToQueue do amqplib
    mockSendToQueue = jest.fn();
    (amqp.connect as jest.Mock).mockResolvedValue({
      createChannel: jest.fn().mockResolvedValue({
        assertQueue: jest.fn().mockResolvedValue(undefined),
        sendToQueue: mockSendToQueue,
        close: jest.fn(),
      }),
    });
  });

  it('should send a notification message to the queue', async () => {
    const message = 'New card added to deck!';
    await sendNotification(message);

    // Verifica se o sendToQueue foi chamado corretamente
    expect(mockSendToQueue).toHaveBeenCalledWith(
      'deck-updates',
      expect.any(Buffer),
      { persistent: true }
    );
  });
});
