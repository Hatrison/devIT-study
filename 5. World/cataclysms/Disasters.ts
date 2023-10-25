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

export class Earthquake extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 40): number {
    return new Earthquake(maxDamage).start(world);
  }
}

export class Flood extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 30): number {
    return new Flood(maxDamage).start(world);
  }
}

export class Tornado extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 50): number {
    return new Tornado(maxDamage).start(world);
  }
}

export class Meteorite extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 80): number {
    return new Meteorite(maxDamage).start(world);
  }
}

export class AlienInvasion extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 100): number {
    return new AlienInvasion(maxDamage).start(world);
  }
}

export class Tsunami extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 30): number {
    return new Tsunami(maxDamage).start(world);
  }
}

export class Fire extends Disaster {
  constructor(maxDamage: number) {
    super(maxDamage);
  }

  public static create(world: World, maxDamage: number = 20): number {
    return new Fire(maxDamage).start(world);
  }
}
