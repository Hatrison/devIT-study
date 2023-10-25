import { World } from '../World.ts';
import { Cataclysm, TStats } from './Cataclysm.ts';

export class Illness extends Cataclysm {
  protected years: number;

  constructor(maxDamage: number) {
    super(maxDamage);
    this.years = 5;
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
      const { dead }: TStats = this.reducePopulation(world.people);
      world.stats.died += dead;
    }, world.tick);

    setTimeout(() => {
      clearInterval(intervalID);
      console.log(`${this.constructor.name} ended!`);
    }, world.tick * this.years);
  }
}

export class Plague extends Illness {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.years = 7;
  }

  public static create(world: World, maxDamage: number = 50): number {
    return new Plague(maxDamage).start(world);
  }
}

export class Epidemic extends Illness {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.years = 5;
  }

  public static create(world: World, maxDamage: number = 10): number {
    return new Epidemic(maxDamage).start(world);
  }
}
