import { Human, Man, Woman } from './Human.ts';
import { professions } from './constants.ts';
import { Cataclysm } from './Cataclysm.ts';

export class World {
  constructor(
    public people: (Man | Woman)[] = [],
    public year: number = 0,
    private tick: number = 1000
  ) {}

  private stats: { died: number; born: number; year?: number } = {
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

      if (this.year === 10) {
        const dead = Cataclysm.create(this);
        this.stats.died = this.stats.died + dead;
        console.log(
          `Cataclysm killed ${dead} people! Still alive ${this.people.length}`
        );
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
}
