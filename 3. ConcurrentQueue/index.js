class Queue {
  /**
   * Creates a new instance of the Queue class.
   * @param {number} concurrency - The maximum number of concurrently executing tasks.
   */
  constructor(concurrency = 5) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
    this.paused = false;
  }

  /**
   * Adds a task to the queue with the specified priority.
   * @param {Function} task - The task function to be executed.
   * @param {number} priority - The priority of the task (higher values indicate higher priority).
   */
  add = (task, priority = 0) => {
    this.queue.push({ task, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
    const isEmptyPlace = this.running < this.concurrency;
    if (isEmptyPlace) this.run();
  };

  /**
   * Initiates the execution of tasks from the queue respecting the concurrency limit.
   */
  run = () => {
    if (this.paused) return;

    if (this.running >= this.concurrency || this.queue.length === 0) return;

    this.running++;

    const { task } = this.queue.shift();

    this.process(task)
      .catch(console.log)
      .finally(() => {
        this.running--;
        if (this.queue.length > 0) this.run();
      });
  };

  /**
   * Processes a task with a Promise, handling errors and completion.
   * @param {Function} task - The task function to be executed with a Promise.
   * @returns {Promise} A Promise that resolves when the task completes successfully or rejects on error.
   */
  process = (task) => {
    return new Promise(async (resolve, reject) => {
      try {
        await task();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * Clears the queue and resets the count of running tasks (stops execution).
   */
  stop = () => {
    this.queue = [];
    this.running = 0;
  };

  /**
   * Pauses the execution of tasks in the queue.
   */
  pause = () => {
    this.paused = true;
  };

  /**
   * Resumes the execution of tasks in the queue.
   */
  resume = () => {
    this.paused = false;
    if (this.queue.length > 0) {
      const emptyPlaces = this.concurrency - this.running;

      for (let i = 0; i < emptyPlaces; i++) {
        this.run();
      }
    }
  };
}

// =========Tests=========
const queue = new Queue(2);

const asyncTask = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // do something
      console.log('Async task is done:', id);
      resolve();
    }, 1000);
  });
};

const syncTask = (id) => {
  setTimeout(() => {
    // do something
    console.log('Sync task is done:', id);
  }, 1000);
};

for (let i = 0; i < 10; i++) {
  queue.add(() => asyncTask(i), i);
}

setTimeout(() => {
  queue.pause();
}, 3000);

setTimeout(() => {
  queue.resume();
}, 7000);

