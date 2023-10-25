import { boysNames, girlsNames } from './constants.ts';

export class Human {
  constructor(
    public name: string = 'Kolya',
    public surname: string = 'Valakas',
    public age: number = 0,
    public eyes: string = 'blue', //'brown' | 'blue' | 'green'
    protected hair: string = 'blond', // 'blond' | 'fair' | 'brunette' | 'ginger'
    protected skin: string = 'white', // 'white' | 'black'
    protected bodyType: string = 'meso', // 'ekto' | 'meso' | 'endo'
    protected maxHeight: number = 180,
    protected maxWeight: number = 100,
    protected height: number = 35,
    protected weight: number = 4,
    public partner: Man | Woman | any = null,
    public parents: Human[] = [],
    public children: Human[] = [],
    public profession?: string
  ) {}

  protected canCreatePair(human: Human): boolean {
    return (
      this.age >= 18 && human.age >= 18 && Math.abs(this.age - human.age) <= 5
    );
  }

  public createPair(human: Human): boolean {
    if (this.canCreatePair(human)) {
      this.partner = human;
      human.partner = this;

      return true;
    }
    return false;
  }

  public isAlive(): boolean {
    return this.age <= 85;
  }

  public isIncest(human: Human): boolean {
    return this.parents[0]?.children.includes(human);
  }

  public increaseHeightAndWeight(): void {
    if (this.age < 3) {
      this.height += 25;
      this.weight += 3;
    } else if (this.age < 12) {
      this.height += 10;
      this.weight += 2;
    } else if (this.age < 18) {
      this.height += 2;
      this.weight += 1;
    } else {
      this.height >= this.maxHeight
        ? (this.height = this.maxHeight)
        : this.height++;
      this.weight >= this.maxWeight
        ? (this.weight = this.maxWeight)
        : this.weight++;
    }
  }
}

export class Man extends Human {
  public gender: string;

  constructor(...args: any[]) {
    super(...args);
    this.gender = 'male';
  }

  public createPair(human: Human): boolean {
    const result: boolean = super.createPair(human);
    if (result) this.partner.surname = this.surname;

    return result;
  }
}

export class Woman extends Human {
  public gender: string;
  public canBorn: boolean;

  constructor(...args: any[]) {
    super(...args);
    this.gender = 'female';
    this.canBorn = false;
  }

  public createPair(human: Human): boolean {
    const result: boolean = super.createPair(human);
    if (result) this.surname = this.partner.surname;
    return result;
  }

  public bornChild(): Man | Woman {
    const gender = this.randomGender();
    const name =
      gender === 'male'
        ? this.chooseRandomName(boysNames)
        : this.chooseRandomName(girlsNames);
    const characteristics: (string | number)[] = [
      name,
      this.surname,
      0,
      this.generateEyes(this.partner),
      this.generateProperty('hair', this.partner),
      this.generateProperty('skin', this.partner),
      this.generateProperty('bodyType', this.partner),
      this.generateAverage('maxHeight', this.partner, gender),
      this.generateAverage('maxWeight', this.partner, gender),
    ];

    const child: Man | Woman =
      gender === 'male'
        ? new Man(...characteristics)
        : new Woman(...characteristics);

    child.parents.push(this);
    child.parents.push(this.partner);

    this.children.push(child);
    this.partner.children.push(child);

    return child;
  }

  private chooseRandomName(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  protected randomGender(): 'male' | 'female' {
    return Math.random() < 0.5 ? 'male' : 'female';
  }

  protected generateEyes(partner: Man): string {
    const probability: number = Math.random();

    if (this.eyes === 'brown' && partner.eyes === 'brown') {
      if (probability >= 0.25) {
        return 'brown';
      } else if (probability <= 0.25 && probability > 0.06) {
        return 'blue';
      } else {
        return 'green';
      }
    } else if (this.eyes === 'green' && partner.eyes === 'brown') {
      if (probability >= 0.5) {
        return 'brown';
      } else if (probability <= 0.5 && probability > 0.13) {
        return 'blue';
      } else {
        return 'green';
      }
    } else if (this.eyes === 'blue' && partner.eyes === 'brown') {
      if (probability >= 0.5) {
        return 'brown';
      } else {
        return 'blue';
      }
    } else if (this.eyes === 'green' && partner.eyes === 'green') {
      if (probability >= 0.25) {
        return 'green';
      } else {
        return 'blue';
      }
    } else if (this.eyes === 'green' && partner.eyes === 'blue') {
      if (probability >= 0.5) {
        return 'green';
      } else {
        return 'blue';
      }
    } else if (this.eyes === 'blue' && partner.eyes === 'blue') {
      if (probability >= 0.01) {
        return 'blue';
      } else {
        return 'green';
      }
    } else {
      return this.eyes;
    }
  }

  protected generateProperty(property: string, partner: Human): string {
    if (this[property as keyof Human] === partner[property as keyof Human]) {
      return this[property as keyof Human] as string;
    } else {
      return Math.random() < 0.5
        ? (this[property as keyof Human] as string)
        : (partner[property as keyof Human] as string);
    }
  }

  protected generateAverage(
    property: 'maxHeight' | 'maxWeight',
    partner: Human,
    gender: string
  ): number {
    const middle = (this[property] + partner[property]) / 2;
    const delta = partner[property] - middle;
    const genderDelta = Math.random() * delta * (gender === 'male' ? 1 : -1);
    return Math.round(middle + genderDelta);
  }
}
