import { World } from '../World.ts';
import { Cataclysm } from './Cataclysm.ts';

/**
 * Represents a weather-related cataclysm that can affect the world's temperature and population.
 * @class
 * @extends Cataclysm
 */
export class WeatherCataclysm extends Cataclysm {
  /**
   * The current temperature set by the weather cataclysm.
   * @protected
   * @type {number}
   */
  protected temperature: number;

  /**
   * The duration, in years, for which the weather cataclysm persists.
   * @protected
   * @type {number}
   */
  protected years: number;

  /**
   * The minimum temperature allowed during the cataclysm.
   * @protected
   * @type {number}
   */
  protected minTemperature: number;

  /**
   * Create a Weather Cataclysm.
   * @constructor
   * @param {number} maxDamage - The maximum damage or impact this weather cataclysm can cause.
   */
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = -35;
    this.years = 10;
    this.minTemperature = 0;
  }

  /**
   * Creates and starts a weather cataclysm in the world, affecting the temperature and population.
   * @static
   * @param {World} world - The world where the weather cataclysm occurs.
   * @param {number} maxDamage - The maximum damage or impact this weather cataclysm can cause.
   * @returns {number} - The number of people or impact caused by the weather cataclysm.
   */
  public static create(world: World, maxDamage: number = 0): number {
    return new WeatherCataclysm(maxDamage).start(world);
  }

  /**
   * Starts the weather cataclysm, affecting the temperature and population over time.
   * @protected
   * @param {World} world - The world where the weather cataclysm occurs.
   * @returns {number} - The impact or changes caused by the weather cataclysm.
   */
  protected start(world: World): number {
    this.reduceTemperature(world);
    return 0;
  }

  /**
   * Reduces the temperature in the world due to the weather cataclysm and restores it after a set duration.
   * @protected
   * @param {World} world - The world where the weather cataclysm occurs.
   */
  protected reduceTemperature(world: World): void {
    world.temperature = Math.floor(
      Math.random() * this.temperature + this.minTemperature
    );
    console.log(`Temperature changed to ${world.temperature}!`);
    setTimeout(() => {
      world.temperature = 20;
      console.log(`Temperature restored to ${world.temperature}!`);
    }, world.tick * this.years);
  }
}

/**
 * Represents a nuclear winter cataclysm that can affect the world's temperature and population.
 * @class
 * @extends WeatherCataclysm
 */
export class NuclearWinter extends WeatherCataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = -100; // Specific temperature setting for nuclear winter.
  }

  /**
   * Creates and starts a nuclear winter cataclysm in the world, affecting the temperature and population.
   * @static
   * @param {World} world - The world where the nuclear winter occurs.
   * @param {number} maxDamage - The maximum damage or impact this nuclear winter can cause.
   * @returns {number} - The number of people or impact caused by the nuclear winter.
   */
  public static create(world: World, maxDamage: number = 0): number {
    return new NuclearWinter(maxDamage).start(world);
  }
}

/**
 * Represents a heat wave cataclysm that can affect the world's temperature and population.
 * @class
 * @extends WeatherCataclysm
 */
export class HeatWave extends WeatherCataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = 50; // Specific temperature setting for heat wave.
    this.years = 1; // Specific duration of the cataclysm setting for heat wave.
    this.minTemperature = 20; // Specific minimum temperature setting for heat wave.
  }

  /**
   * Creates and starts a heat wave cataclysm in the world, affecting the temperature and population.
   * @static
   * @param {World} world - The world where the heat wave occurs.
   * @param {number} maxDamage - The maximum damage or impact this heat wave can cause.
   * @returns {number} - The number of people or impact caused by the heat wave.
   */
  public static create(world: World, maxDamage: number = 0): number {
    return new HeatWave(maxDamage).start(world);
  }
}

/**
 * Represents a glacial period cataclysm that can affect the world's temperature and population.
 * @class
 * @extends WeatherCataclysm
 */
export class GlacialPeriod extends WeatherCataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = -80; // Specific temperature setting for glacial period.
    this.years = 20; // Specific duration of the cataclysm setting for glacial period.
  }

  /**
   * Creates and starts a glacial period cataclysm in the world, affecting the temperature and population.
   * @static
   * @param {World} world - The world where the glacial period occurs.
   * @param {number} maxDamage - The maximum damage or impact this glacial period can cause.
   * @returns {number} - The number of people or impact caused by the glacial period.
   */
  public static create(world: World, maxDamage: number = 0): number {
    return new GlacialPeriod(maxDamage).start(world);
  }
}
