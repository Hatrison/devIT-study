import { World } from '../World.ts';
import { Cataclysm } from './Cataclysm.ts';

export class WeatherCataclysm extends Cataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 10): number {
    return new WeatherCataclysm(maxDamage).start(world);
  }

  protected start(world: World): number {
    this.reduceTemperature(world);
    return 0;
  }

  protected reduceTemperature(world: World): void {
    world.temperature = Math.floor(Math.random() * 35 * -1);
    console.log(`Temperature reduced to ${world.temperature}!`);
    setTimeout(() => {
      world.temperature = 20;
      console.log(`Temperature restored to ${world.temperature}!`);
    }, world.tick * 10);
  }
}
