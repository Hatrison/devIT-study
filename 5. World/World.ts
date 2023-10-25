import { Human, Man, Woman } from './Human.ts';
import { professions } from './constants.ts';
import {
  GlacialPeriod,
  HeatWave,
  NuclearWinter,
} from './cataclysms/WeatherCataclysms.ts';
import {
  AlienInvasion,
  Earthquake,
  Fire,
  Flood,
  Meteorite,
  Tornado,
  Tsunami,
} from './cataclysms/Disasters.ts';
import { Epidemic, Plague } from './cataclysms/Illnesses.ts';
import { Cataclysm } from './cataclysms/Cataclysm.ts';

type TCataclysm = { name: typeof Cataclysm; possibility: number };

const cataclysms: TCataclysm[] = [
  { name: NuclearWinter, possibility: 0.00001 },
  { name: HeatWave, possibility: 0.1 },
  { name: GlacialPeriod, possibility: 0.00001 },
  { name: Earthquake, possibility: 0.1 },
  { name: Flood, possibility: 0.1 },
  { name: Tornado, possibility: 0.1 },
  { name: Meteorite, possibility: 0.00001 },
  { name: AlienInvasion, possibility: 0.000001 },
  { name: Tsunami, possibility: 0.01 },
  { name: Fire, possibility: 0.1 },
  { name: Plague, possibility: 0.0001 },
  { name: Epidemic, possibility: 0.0001 },
];

export class World {
  constructor(
    public people: (Man | Woman)[] = [],
    public year: number = 0,
    public temperature: number = 20,
    public tick: number = 1000
  ) {}

  public stats: { died: number; born: number; year?: number } = {
    died: 0,
    born: 0,
  };

  public life(): void {
    setInterval((): void => {
      this.people.forEach((human: Man | Woman): void => {
        human.age++;
        human.increaseHeightAndWeight();

        if (human.age === 18) {
          human.profession = this.generateProfession();
        }

        if (this.temperature < 0) {
          this.deathDueToTemperature();
        }

        if (!human.isAlive()) {
          this.people.splice(this.people.indexOf(human), 1);
          this.stats.died++;
        }

        if (human instanceof Woman && human.age >= 18 && human.age <= 35) {
          human.canBorn = true;
        }

        if (human.age >= 18 && human.partner === null) {
          const partner: Man | Woman | null = this.findPartner(human);
          if (partner && !human.isIncest(partner)) {
            human.createPair(partner);
          }
        }

        if (human instanceof Woman && this.femaleCanBorn(human)) {
          this.tryToBorn(human);
        }
      });

      this.year++;

      const cataclysm: TCataclysm | null = this.getRandomCataclysm();
      if (cataclysm) {
        const dead = cataclysm.name.create(this);
        this.stats.died = this.stats.died + dead;
      }

      this.stats = {
        ...this.stats,
        year: this.year,
      };

      if (this.year % 20 === 0) {
        console.table({
          ...this.stats,
          ...this.calculatePeople(),
          overall: this.people.length,
        });
      } else {
        console.table(this.stats);
      }

      this.stats = {
        died: 0,
        born: 0,
      };
    }, this.tick);
  }

  private findPartner(human: Man | Woman): Man | Woman | null {
    return (
      this.people.find(
        (h: Man | Woman): boolean =>
          human.gender !== h.gender &&
          h.age >= 18 &&
          Math.abs(human.age - h.age) <= 5
      ) || null
    );
  }

  private born(human: Woman, quantity: number) {
    return setTimeout((): void => {
      for (let i = 1; i <= quantity; i++) {
        const child: Man | Woman = human.bornChild();

        this.stats.born++;
        this.people.push(child);
      }
      human.canBorn = false;
      setTimeout((): void => {
        human.canBorn = true;
      }, this.tick * 2);
    }, this.tick);
  }

  private willBorn(probability: number, childrenQuantity: number): boolean {
    return (
      (probability <= 0.85 && childrenQuantity === 0) ||
      (probability <= 0.5 && childrenQuantity === 1) ||
      (probability <= 0.2 && childrenQuantity === 2) ||
      probability <= 0.1
    );
  }

  private tryToBorn(human: Woman): void {
    const childrenQuantity: number = human.children.length;
    const probability: number = Math.random();

    let bornQuantity: number = 1;
    const bornProbability: number = Math.random();
    if (bornProbability <= 0.1) {
      bornQuantity = 2;
    } else if (bornProbability <= 0.05) {
      bornQuantity = 3;
    }

    if (this.willBorn(probability, childrenQuantity)) {
      this.born(human, bornQuantity);
    }
  }

  private calculatePeople(): Object {
    const children: number = this.people.filter(
      (human: Human): boolean => human.age < 18
    ).length;

    const males: number = this.people.filter(
      (human: Human): boolean => human instanceof Man
    ).length;

    const females: number = this.people.length - males;

    return { males, females, children };
  }

  private femaleCanBorn(female: Woman): boolean {
    return (
      (female.canBorn &&
        female.partner &&
        female.age >= 18 &&
        female.age <= 40 &&
        female.children.length < 5) ||
      false
    );
  }

  private chooseRandomProfession(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generateProfession(): string {
    const uniqueProfessions: string[] = ['leader', 'oracle', 'shaman'];
    const busyProfessions: string[] | undefined = this.people
      .filter((human: Human) =>
        uniqueProfessions.includes((human.profession as string)?.toLowerCase())
      )
      .map((human: Human) => human.profession as string);

    return this.chooseRandomProfession(
      professions.filter(
        (profession: string) =>
          !busyProfessions?.includes(profession.toLowerCase())
      )
    );
  }

  private getRandomCataclysm(): TCataclysm | null {
    const randomValue: number = Math.random();

    const eligibleCataclysms: TCataclysm[] = cataclysms.filter(
      ({ possibility }) => possibility >= randomValue
    );

    if (eligibleCataclysms.length === 0) {
      return null;
    }

    return eligibleCataclysms[
      Math.floor(Math.random() * eligibleCataclysms.length)
    ];
  }

  private deathDueToTemperature(): void {
    const probability: number = Math.random();

    const willDieDueToTemperature: boolean =
      (probability <= 0.2 && this.temperature <= 60) ||
      (probability <= 0.05 && this.temperature <= 40) ||
      (probability <= 0.05 && this.temperature <= 0) ||
      (probability <= 0.1 && this.temperature <= -10) ||
      (probability <= 0.3 && this.temperature <= -30) ||
      (probability <= 0.5 && this.temperature <= -50);

    if (willDieDueToTemperature) {
      const index: number = Math.floor(Math.random() * this.people.length);
      this.people.splice(index, 1);
      this.stats.died++;
    }
  }
}
