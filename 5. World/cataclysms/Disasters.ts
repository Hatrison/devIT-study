import { World } from '../World.ts';
import { Cataclysm } from './Cataclysm.ts';

/**
 * Represents a catastrophic disaster that can affect the world and its population.
 * @class
 * @extends Cataclysm
 */
export class Disaster extends Cataclysm {
  /**
   * Create a Disaster.
   * @constructor
   * @param {number} maxDamage - The maximum damage or casualties this disaster can cause.
   */
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts a disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the disaster occurs.
   * @param {number} maxDamage - The maximum damage or casualties this disaster can cause.
   * @returns {number} - The number of people killed by the disaster.
   */
  public static create(world: World, maxDamage: number = 40): number {
    return new Disaster(maxDamage).start(world);
  }
}

/**
 * Represents an earthquake disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class Earthquake extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts an earthquake disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the earthquake occurs.
   * @param {number} maxDamage - The maximum damage or casualties this earthquake can cause.
   * @returns {number} - The number of people killed by the earthquake.
   */
  public static create(world: World, maxDamage: number = 40): number {
    return new Earthquake(maxDamage).start(world);
  }
}

/**
 * Represents a flood disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class Flood extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts a flood disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the flood occurs.
   * @param {number} maxDamage - The maximum damage or casualties this flood can cause.
   * @returns {number} - The number of people killed by the flood.
   */
  public static create(world: World, maxDamage: number = 30): number {
    return new Flood(maxDamage).start(world);
  }
}

/**
 * Represents a tornado disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class Tornado extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts a tornado disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the tornado occurs.
   * @param {number} maxDamage - The maximum damage or casualties this tornado can cause.
   * @returns {number} - The number of people killed by the tornado.
   */
  public static create(world: World, maxDamage: number = 50): number {
    return new Tornado(maxDamage).start(world);
  }
}

/**
 * Represents a meteorite disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class Meteorite extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts a meteorite disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the meteorite occurs.
   * @param {number} maxDamage - The maximum damage or casualties this meteorite can cause.
   * @returns {number} - The number of people killed by the meteorite.
   */
  public static create(world: World, maxDamage: number = 80): number {
    return new Meteorite(maxDamage).start(world);
  }
}

/**
 * Represents an alien invasion disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class AlienInvasion extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts an alien invasion disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the alien invasion occurs.
   * @param {number} maxDamage - The maximum damage or casualties this alien invasion can cause.
   * @returns {number} - The number of people killed by the alien invasion.
   */
  public static create(world: World, maxDamage: number = 100): number {
    return new AlienInvasion(maxDamage).start(world);
  }
}

/**
 * Represents a tsunami disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class Tsunami extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts a flood disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the tsunami occurs.
   * @param {number} maxDamage - The maximum damage or casualties this tsunami can cause.
   * @returns {number} - The number of people killed by the tsunami.
   */
  public static create(world: World, maxDamage: number = 30): number {
    return new Tsunami(maxDamage).start(world);
  }
}

/**
 * Represents a fire disaster that can affect the world and its population.
 * @class
 * @extends Disaster
 */
export class Fire extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  /**
   * Creates and starts a fire disaster in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the fire occurs.
   * @param {number} maxDamage - The maximum damage or casualties this fire can cause.
   * @returns {number} - The number of people killed by the fire.
   */
  public static create(world: World, maxDamage: number = 20): number {
    return new Fire(maxDamage).start(world);
  }
}
