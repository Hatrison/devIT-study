import Queue from './index.js';

const queue = new Queue(2).onComplete(() => console.log('Completed!'));

const asyncTask = id => {
  return new Promise(resolve => {
    setTimeout(() => {
      // do something
      resolve(id);
    }, 1000);
  });
};

const syncTask = id => {
  // do something
  return id;
};

for (let i = 0; i < 10; i++) {
  queue.add(() => asyncTask(i), {
    priority: i,
    onResolve: id => console.log('Task is done:', id),
  });
}

setTimeout(() => {
  queue.stop();
}, 3000);

setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    queue.add(() => asyncTask(i), {
      priority: i,
      onResolve: id => console.log('Task is done:', id),
    });
  }
}, 7000);