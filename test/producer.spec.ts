import { sendNotification } from '../src/notifications/producer';
import * as amqp from 'amqplib';


jest.mock('amqplib');

describe('Producer Tests', () => {
  let mockSendToQueue: jest.Mock;

  beforeAll(() => {
    
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

   
    expect(mockSendToQueue).toHaveBeenCalledWith(
      'deck-updates',
      expect.any(Buffer),
      { persistent: true }
    );
  });
});
