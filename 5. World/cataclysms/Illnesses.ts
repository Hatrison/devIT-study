import { World } from '../World.ts';
import { Cataclysm, TStats } from './Cataclysm.ts';

export class Illness extends Cataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 30): number {
    return new Illness(maxDamage).start(world);
  }

  protected start(world: World): number {
    this.startIllness(world);
    return 0;
  }

  protected startIllness(world: World): void {
    console.log(`${this.constructor.name} happened!`);

    const intervalID: NodeJS.Timeout = setInterval(() => {
      const { dead } = this.reducePopulation(world.people);
      world.stats.died += dead;
    }, world.tick);

    setTimeout(() => {
      clearInterval(intervalID);
      console.log(`${this.constructor.name} ended!`);
    }, world.tick * 5);
  }
}
