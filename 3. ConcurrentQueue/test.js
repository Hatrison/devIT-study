import Queue from './index.js';

const queue = new Queue(2).onComplete(() => console.log('Completed!'));

const asyncTask = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // do something
      resolve(id);
      //reject(new Error('Something went wrong!'));
    }, 1000);
  });
};

const syncTask = id => {
  // do something
  return id;
};

for (let i = 20; i < 70; i = i + 3) {
  queue.add(() => asyncTask(i), {
    priority: i,
    onResolve: id => console.log('Task is done:', id),
  });
}

// setTimeout(() => {
//   queue.stop();
// }, 3000);
//
// setTimeout(() => {
//   for (let i = 0; i < 10; i++) {
//     queue.add(() => asyncTask(i), {
//       priority: i,
//       onResolve: id => console.log('Task is done:', id),
//     });
//   }
// }, 7000);
