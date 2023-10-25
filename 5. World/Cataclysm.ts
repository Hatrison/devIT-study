import { Man, Woman } from './Human.ts';
import { World } from './World.ts';

export class Cataclysm {
  constructor(private maxDamage: number) {}

  public static create(world: World, maxDamage: number = 80): number {
    return new Cataclysm(maxDamage).start(world);
  }

  private start(world: World): number {
    const { dead } = this.reducePopulation(world.people);
    return dead;
  }

  private reducePopulation(people: (Man | Woman)[]): {
    alive: number;
    dead: number;
  } {
    const totalPopulation: number = people.length;
    const peopleToKill: number = Math.min(
      totalPopulation,
      Math.floor(totalPopulation * ((Math.random() * this.maxDamage) / 100))
    );

    const index = Math.max(
      0,
      Math.floor(Math.random() * (totalPopulation - peopleToKill))
    );

    console.log(
      `Total population: ${totalPopulation} Cataclysm killed ${peopleToKill} people! Index: ${index}`
    );

    const dead = people.splice(index, peopleToKill);

    return {
      alive: totalPopulation - dead.length,
      dead: dead.length,
    };
  }
}
