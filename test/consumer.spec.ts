import { receiveNotifications } from '../src/notifications/consumer';
import * as amqp from 'amqplib';


jest.mock('amqplib');

describe('Consumer Tests', () => {
  let mockConsume: jest.Mock;

  beforeAll(() => {

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

    
    mockConsume.mockImplementationOnce((queue, callback) => {
      callback(fakeMessage);
    });

    await receiveNotifications();

    
    expect(mockConsume).toHaveBeenCalled();
  });
});
