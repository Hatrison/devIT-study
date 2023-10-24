import Human from './Human.ts';
import { professions } from './constants.ts';

export default class World {
  constructor(
    public people: Human[] = [],
    public year: number = 0,
    private tick: number = 1000
  ) {}

  private findPartner(human: Human): Human | null {
    return (
      this.people.find(
        (h: Human): boolean =>
          h.partner === null &&
          human.gender !== h.gender &&
          h.age >= 18 &&
          human.age >= 18 &&
          Math.abs(human.age - h.age) <= 10
      ) || null
    );
  }

  private tryToBorn(human: Human): void {
    if (Math.random() <= 0.8) {
      setTimeout((): void => {
        const child: Human | null = human.bornChild();
        if (child) {
          this.people.push(child);
          human.canBorn = false;
          setTimeout((): void => {
            human.canBorn = true;
          }, this.tick * 2);
        }
      }, this.tick);
    }
  }

  private calculatePeople(): number[] {
    const children: number = this.people.filter(
      (human: Human): boolean => human.age < 18
    ).length;

    const males: number = this.people.filter(
      (human: Human): boolean => human.gender === 'male'
    ).length;

    const females: number = this.people.length - males;

    return [males, females, children];
  }

  private femaleCanBorn(female: Human): boolean {
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

  public life(): void {
    setInterval((): void => {
      this.people.forEach((human: Human): void => {
        human.age++;
        human.increaseHeightAndWeight();

        if (human.age === 18) {
          human.profession = this.generateProfession();
        }

        if (!human.isAlive()) {
          this.people.splice(this.people.indexOf(human), 1);
          console.log(`${human.name} ${human.surname} is dead`);
        }

        if (human.gender === 'female' && human.age >= 18 && human.age <= 35) {
          human.canBorn = true;
        }

        if (human.age >= 18 && human.partner === null) {
          const partner: Human | null = this.findPartner(human);
          if (partner && !human.isIncest(partner)) {
            human.createPair(partner);
          }
        }

        if (this.femaleCanBorn(human)) {
          this.tryToBorn(human);
        }
      });

      this.year++;

      const [males, females, children]: number[] = this.calculatePeople();

      console.log(
        `Males: ${males}; Females: ${females}; Children: ${children}; year: ${this.year}`
      );
    }, this.tick);
  }
}
