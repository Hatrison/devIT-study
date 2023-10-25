import { World } from '../World.ts';
import { Cataclysm } from './Cataclysm.ts';

export class Disaster extends Cataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 40): number {
    return new Disaster(maxDamage).start(world);
  }
}
