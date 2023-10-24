import Human from './Human.ts';
import World from './World.ts';

const male = new Human(
  'Ilya',
  'Peikert',
  'male',
  19,
  'brown',
  'brunette',
  'white',
  'endo',
  185,
  70,
  185,
  70,
  null,
  [],
  [],
  'hunter'
);

const female = new Human(
  'Katya',
  'Boyko',
  'female',
  18,
  'blue',
  'fair',
  'white',
  'meso',
  160,
  50,
  160,
  50,
  null,
  [],
  [],
  'washing machine'
);

const Vadik = new Human(
  'Vadik',
  'Ulanovskiy',
  'male',
  20,
  'brown',
  'fair',
  'white',
  'meso',
  175,
  70,
  175,
  70,
  null,
  [],
  [],
  'farmer'
);

const Masha = new Human(
  'Masha',
  'Kochanova',
  'female',
  19,
  'brown',
  'fair',
  'white',
  'ekto',
  170,
  50,
  170,
  50,
  null,
  [],
  [],
  'cooker'
);

const Vovik = new Human(
  'Vovik',
  'Zherlitsin',
  'male',
  19,
  'green',
  'fair',
  'black',
  'endo',
  175,
  70,
  175,
  70,
  null,
  [],
  [],
  'miner'
);

const world = new World([male, female, Vadik, Masha, Vovik]);
world.life();
