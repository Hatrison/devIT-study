import { Man, Woman } from './Human.ts';
import { World } from './World.ts';

const male = new Man(
  'Ilya',
  'Peikert',
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
  'leader'
);

const female = new Woman(
  'Katya',
  'Boyko',
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

const Vadik = new Man(
  'Vadik',
  'Ulanovskiy',
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
  'oracle'
);

const Masha = new Woman(
  'Masha',
  'Kochanova',
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

const Vovik = new Man(
  'Vovik',
  'Zherlitsin',
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
  'shaman'
);

const world = new World([male, female, Vadik, Masha, Vovik]);
world.life();
