export interface Task {
    execute: () => void;
    priority: number;
  }
  
  export class PriorityQueue {
    private queue: Task[] = [];
  
    enqueue(task: () => void, priority: number): void {
      const newTask: Task = { execute: task, priority };
      const index = this.queue.findIndex((item) => item.priority > priority);
      if (index === -1) {
        this.queue.push(newTask);
      } else {
        this.queue.splice(index, 0, newTask);
      }
    }
  
    dequeue(): Task | undefined {
      return this.queue.shift();
    }
  
    isEmpty(): boolean {
      return this.queue.length === 0;
    }
  }
  
  export const enqueueTask = (queue: PriorityQueue, task: () => void, isAdmin: boolean): void => {
    const priority = isAdmin ? 1 : 2;
    queue.enqueue(task, priority);
  };
  