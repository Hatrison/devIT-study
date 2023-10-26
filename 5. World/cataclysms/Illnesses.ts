import { World } from '../World.ts';
import { Cataclysm, TStats } from './Cataclysm.ts';

/**
 * Represents an illness or epidemic that can affect the world and its population.
 * @class
 * @extends Cataclysm
 */
export class Illness extends Cataclysm {
  /**
   * The number of years the illness lasts.
   * @protected
   * @type {number}
   */
  protected years: number;

  /**
   * Create an Illness.
   * @constructor
   * @param {number} maxDamage - The maximum damage or casualties this illness can cause.
   */
  constructor(maxDamage: number) {
    super(maxDamage);
    this.years = 5;
  }

  /**
   * Creates and starts an illness in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the illness occurs.
   * @param {number} maxDamage - The maximum damage or casualties this illness can cause.
   * @returns {number} - The number of people killed by the illness.
   */
  public static create(world: World, maxDamage: number = 30): number {
    return new Illness(maxDamage).start(world);
  }

  /**
   * Starts the illness, affecting the population and tracking casualties over time.
   * @protected
   * @param {World} world - The world where the illness occurs.
   * @returns {number} - The number of people killed by the illness.
   */
  protected start(world: World): number {
    this.startIllness(world);
    return 0;
  }

  /**
   * Starts the illness, affecting the population and tracking casualties over time.
   * @protected
   * @param {World} world - The world where the illness occurs.
   */
  protected startIllness(world: World): void {
    console.log(`${this.constructor.name} happened!`);

    const intervalID: NodeJS.Timeout = setInterval(() => {
      const { dead }: TStats = this.reducePopulation(world.people);
      world.stats.died += dead;
    }, world.tick);

    setTimeout(() => {
      clearInterval(intervalID);
      console.log(`${this.constructor.name} ended!`);
    }, world.tick * this.years);
  }
}

/**
 * Represents a plague that can affect the world and its population.
 * @class
 * @extends Illness
 */
export class Plague extends Illness {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.years = 7; // Specific number of years for a plague.
  }

  /**
   * Creates and starts a plague in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the plague occurs.
   * @param {number} maxDamage - The maximum damage or casualties this plague can cause.
   * @returns {number} - The number of people killed by the plague.
   */
  public static create(world: World, maxDamage: number = 50): number {
    return new Plague(maxDamage).start(world);
  }
}

export class Epidemic extends Illness {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.years = 5; // Specific number of years for an epidemic.
  }

  /**
   * Creates and starts an epidemic in the world, causing damage and reducing the population.
   * @static
   * @param {World} world - The world where the epidemic occurs.
   * @param {number} maxDamage - The maximum damage or casualties this epidemic can cause.
   * @returns {number} - The number of people killed by the epidemic.
   */
  public static create(world: World, maxDamage: number = 10): number {
    return new Epidemic(maxDamage).start(world);
  }
}
