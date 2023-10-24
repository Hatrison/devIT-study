import { boysNames, girlsNames } from './constants.ts';

export default class Human {
  constructor(
    public name: string = 'Kolya',
    public surname: string = 'Valakas',
    public gender: 'male' | 'female' = 'male',
    public age: number = 0,
    private eyes: string = 'blue', //'brown' | 'blue' | 'green'
    private hair: string = 'blond', // 'blond' | 'fair' | 'brunette' | 'ginger'
    private skin: string = 'white', // 'white' | 'black'
    private bodyType: string = 'meso', // 'ekto' | 'meso' | 'endo'
    private maxHeight: number = 180,
    private maxWeight: number = 100,
    private height: number = 35,
    private weight: number = 4,
    public partner: Human | null = null,
    public parents: Human[] = [],
    public children: Human[] = [],
    public profession?: string,
    public canBorn: boolean = false
  ) {}

  private canCreatePair(human: Human): boolean {
    return (
      this.gender !== human.gender &&
      this.age >= 18 &&
      human.age >= 18 &&
      Math.abs(this.age - human.age) <= 10
    );
  }

  public createPair(human: Human): boolean {
    if (this.canCreatePair(human)) {
      this.partner = human;
      human.partner = this;
      console.log(`${human.name} create a pair with ${human.partner.name}`);

      const { partner } = human;
      if (human.gender === 'female') {
        console.log(
          `${human.name} ${human.surname} change surname to ${partner.surname}`
        );

        human.surname = partner.surname;
      } else {
        console.log(
          `${partner.name} ${partner.surname} change surname to ${human.surname}`
        );

        partner.surname = human.surname;
      }

      return true;
    }
    return false;
  }

  private chooseRandomName(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  public bornChild(): Human | null {
    if (!this.partner) return null;
    const gender = this.randomGender();
    const name =
      gender === 'male'
        ? this.chooseRandomName(boysNames)
        : this.chooseRandomName(girlsNames);
    const child: Human = new Human(
      name,
      this.surname,
      gender,
      0,
      this.generateEyes(this.partner),
      this.generateProperty('hair', this.partner),
      this.generateProperty('skin', this.partner),
      this.generateProperty('bodyType', this.partner),
      this.generateAverage('maxHeight', this.partner, gender),
      this.generateAverage('maxWeight', this.partner, gender)
    );

    console.log(
      `${this.name} born a child ${child.name} ${child.surname} at age ${this.age}`
    );

    console.log(
      `${child.maxHeight} parents are ${this.height} and ${this.partner.height}`
    );

    child.parents.push(this);
    child.parents.push(this.partner);

    this.children.push(child);
    this.partner.children.push(child);

    return child;
  }

  private generateEyes(partner: Human): string {
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

  private generateProperty(property: string, partner: Human): string {
    if (this[property as keyof Human] === partner[property as keyof Human]) {
      return this[property as keyof Human] as string;
    } else {
      return Math.random() < 0.5
        ? (this[property as keyof Human] as string)
        : (partner[property as keyof Human] as string);
    }
  }

  private generateAverage(
    property: 'maxHeight' | 'maxWeight',
    partner: Human,
    gender: string
  ): number {
    const middle = (this[property] + partner[property]) / 2;
    const delta = partner[property] - middle;
    const genderDelta = Math.random() * delta * (gender === 'male' ? 1 : -1);
    return Math.round(middle + genderDelta);
  }

  public isAlive(): boolean {
    return this.age <= 85;
  }

  public isIncest(human: Human): boolean {
    return this.parents[0]?.children.includes(human);
  }

  private randomGender(): 'male' | 'female' {
    return Math.random() < 0.5 ? 'male' : 'female';
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
