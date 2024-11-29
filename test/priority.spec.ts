import { PriorityQueue, enqueueTask } from '../src/priority/decks.priority';

describe('PriorityQueue', () => {
  let queue: PriorityQueue;

  beforeEach(() => {
    queue = new PriorityQueue();
  });

  it('deve adicionar tarefas na ordem correta de prioridade', () => {
    const task1 = jest.fn();
    const task2 = jest.fn();

    queue.enqueue(task1, 2);
    queue.enqueue(task2, 1);

    expect(queue.dequeue()?.execute).toBe(task2); // Prioridade mais alta
    expect(queue.dequeue()?.execute).toBe(task1);
    expect(queue.isEmpty()).toBe(true);
  });

  it('deve adicionar e processar tarefas corretamente usando enqueueTask', () => {
    const adminTask = jest.fn();
    const userTask = jest.fn();

    enqueueTask(queue, adminTask, true);
    enqueueTask(queue, userTask, false);

    expect(queue.dequeue()?.execute).toBe(adminTask); // Admin primeiro
    expect(queue.dequeue()?.execute).toBe(userTask); // Depois o usuário
  });
});
