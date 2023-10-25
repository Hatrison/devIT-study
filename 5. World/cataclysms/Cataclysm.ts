import { Man, Woman } from '../Human.ts';
import { World } from '../World.ts';

export type TStats = {
  total: number;
  alive: number;
  dead: number;
};

export class Cataclysm {
  constructor(private maxDamage: number) {}

  public static create(world: World, maxDamage: number = 80): number {
    return new Cataclysm(maxDamage).start(world);
  }

  protected start(world: World): number {
    const stats: TStats = this.reducePopulation(world.people);
    this.log(stats);
    return stats.dead;
  }

  protected log({ total, dead, alive }: TStats): void {
    console.log(
      `${this.constructor.name} happened! 
      Total population: ${total}; 
      ${this.constructor.name} killed ${dead} people! 
      Still alive ${alive}!`
    );
  }

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
