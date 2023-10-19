export default class Queue {
  /**
   * Creates a new instance of the Queue class.
   * @param {number} concurrency - The maximum number of concurrently executing tasks.
   */
  constructor(concurrency = 5) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
    this.paused = false;
    this.stopped = false;
    this.complete = () => console.log('All tasks are done!');
  }

  processOptions = options => {
    const { priority = 0, onResolve = () => {}, onReject = () => {} } = options;
    return { priority, onResolve, onReject };
  };

  /**
   * Adds a task to the queue with the specified priority.
   * @param {Function} task - The task function to be executed.
   * @param {Object} options - Options of the task (higher values indicate higher priority).
   */
  add = (task, options) => {
    if (this.stopped) this.stopped = false;
    this.queue.push({ task, ...this.processOptions(options) });
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

    const { task, onResolve, onReject } = this.queue.shift();

    this.process(task)
      .then(onResolve)
      .catch(onReject)
      .finally(() => {
        this.running--;
        if (this.queue.length > 0) this.run();
        if (this.queue.length === 0 && this.running === 0 && !this.stopped) {
          this.complete();
        }
      });
  };

  /**
   * Executes a task and handles any errors that may occur during execution.
   * @param {Function} task - The task to be executed.
   * @returns {Promise} A Promise that resolves when the task is completed successfully.
   * @throws {Error} If an error occurs during the execution of the task, it will be logged to the console.
   */
  process = async task => {
    try {
      return await task();
    } catch (error) {
      return error;
    }
  };

  /**
   * Clears the queue.
   */
  stop = () => {
    this.queue = [];
    this.stopped = true;
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

  onComplete = callback => {
    this.complete = callback;
    return this;
  };
}
