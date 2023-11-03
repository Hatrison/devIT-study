import { Man } from '../humans/Man.ts';
import { Woman } from '../humans/Woman.ts';
import { World } from '../World.ts';

export type TStats = {
  total: number;
  alive: number;
  dead: number;
};

export class Cataclysm {
  /**
   * Create a Cataclysm.
   * @constructor
   * @param {number} maxDamage - The maximum damage or casualties this cataclysm can cause.
   */
  constructor(private maxDamage: number) {}

  /**
   * Creates and starts a cataclysm in the world, causing damage and affecting the population.
   * @static
   * @param {World} world - The world where the cataclysm occurs.
   * @param {number} maxDamage - The maximum damage or casualties this cataclysm can cause.
   * @returns {number} - The number of people killed by the cataclysm.
   */
  public static create(world: World, maxDamage: number = 80): number {
    return new Cataclysm(maxDamage).start(world);
  }

  /**
   * Starts the cataclysm, reducing the world's population and logging the results.
   * @protected
   * @param {World} world - The world where the cataclysm occurs.
   * @returns {number} - The number of people killed by the cataclysm.
   */
  protected start(world: World): number {
    const stats: TStats = this.reducePopulation(world.people);
    this.log(stats);
    return stats.dead;
  }

  /**
   * Logs information about the cataclysm, including the total population, casualties, and survivors.
   * @protected
   * @param {TStats} stats - Statistics about the cataclysm's impact.
   */
  protected log({ total, dead, alive }: TStats): void {
    console.log(
      `${this.constructor.name} happened! 
      Total population: ${total}; 
      ${this.constructor.name} killed ${dead} people! 
      Still alive ${alive}!`
    );
  }

  /**
   * Reduces the population of the world by causing casualties due to the cataclysm.
   * @protected
   * @param {(Man | Woman)[]} people - The population of the world.
   * @returns {TStats} - Statistics about the impact of the cataclysm on the population.
   */
  protected reducePopulation(people: (Man | Woman)[]): TStats {
    const totalPopulation: number = people.length;
    const peopleToKill: number = Math.min(
      totalPopulation,
      Math.floor(totalPopulation * ((Math.random() * this.maxDamage) / 100))
    );

    const index = Math.max(
      0,
      Math.floor(Math.random() * (totalPopulation - peopleToKill))
    );

    const dead = people.splice(index, peopleToKill);

    return {
      total: totalPopulation,
      alive: totalPopulation - dead.length,
      dead: dead.length,
    };
  }
}
