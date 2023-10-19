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

  /**
   * Processes the options for a task and returns an object containing chance, onResolve, and onReject.
   * @param {Object} options - Options for the task.
   * @param {number} [options.chance=0] - The chance of early task execution from 0 to 100 (higher values indicate higher chance).
   * @param {Function} [options.onResolve] - A callback function to execute when the task is resolved.
   * @param {Function} [options.onReject] - A callback function to execute when the task is rejected.
   * @returns {{ chance: number, onResolve: Function, onReject: Function }}
   */
  processOptions = options => {
    const { chance = 0, onResolve = () => {}, onReject = () => {} } = options;
    return { chance, onResolve, onReject };
  };

  /**
   * * Adds a task to the queue with an optional chance for early execution.
   * @param {Function} task - The task function to be executed.
   * @param {Object} [options] - Options of the task.
   */
  add = (task, options) => {
    if (this.stopped) this.stopped = false;

    const preparedTask = { task, ...this.processOptions(options) };

    this.randomAdd(preparedTask);

    const isEmptyPlace = this.running < this.concurrency;
    if (isEmptyPlace) this.run();
  };

  /**
   * Randomly adds a task to the beginning or end of the queue based on its chance.
   * @param {Object} task - The task with its chance for early execution.
   */
  randomAdd = task => {
    const randomChance = Math.random() * 100;
    if (task.chance >= randomChance) {
      this.queue.unshift(task);
    } else {
      this.queue.push(task);
    }
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
   * @returns {Promise<any>} A Promise that resolves when the task is completed successfully or rejects with an error.
   */
  process = async task => {
    try {
      return await task();
    } catch (error) {
      return error;
    }
  };

  /**
   * Clears the queue and stops further task execution.
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

  /**
   * Sets a callback function to be executed when all tasks are completed.
   * @param {Function} callback - The callback function to execute when all tasks are done.
   * @returns {Queue} The Queue instance for method chaining.
   */
  onComplete = callback => {
    this.complete = callback;
    return this;
  };
}
