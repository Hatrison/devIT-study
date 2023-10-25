import { World } from '../World.ts';
import { Cataclysm } from './Cataclysm.ts';

export class WeatherCataclysm extends Cataclysm {
  protected temperature: number;
  protected years: number;
  protected minTemperature: number;

  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = -35;
    this.years = 10;
    this.minTemperature = 0;
  }

  public static create(world: World, maxDamage: number = 0): number {
    return new WeatherCataclysm(maxDamage).start(world);
  }

  protected start(world: World): number {
    this.reduceTemperature(world);
    return 0;
  }

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

export class NuclearWinter extends WeatherCataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = -100;
  }

  public static create(world: World, maxDamage: number = 0): number {
    return new NuclearWinter(maxDamage).start(world);
  }
}

export class HeatWave extends WeatherCataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = 50;
    this.years = 1;
    this.minTemperature = 20;
  }

  public static create(world: World, maxDamage: number = 0): number {
    return new HeatWave(maxDamage).start(world);
  }
}

export class GlacialPeriod extends WeatherCataclysm {
  constructor(maxDamage: number) {
    super(maxDamage);
    this.temperature = -80;
    this.years = 20;
  }

  public static create(world: World, maxDamage: number = 0): number {
    return new GlacialPeriod(maxDamage).start(world);
  }
}
