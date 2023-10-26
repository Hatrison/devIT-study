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
  /**
   * Create a World.
   * @constructor
   * @param {(Man | Woman)[]} people - The array of people in the world.
   * @param {number} year - The current year in the world.
   * @param {number} temperature - The current temperature in the world.
   * @param {number} tick - The time interval for world events.
   */
  constructor(
    public people: (Man | Woman)[] = [],
    public year: number = 0,
    public temperature: number = 20,
    public tick: number = 1000
  ) {}

  /**
   * The statistics of the world, including births, deaths, and the current year.
   * @property
   */
  public stats: { died: number; born: number; year?: number } = {
    died: 0,
    born: 0,
  };

  /**
   * Simulates life in the world, advancing time and handling various events.
   */
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

  /**
   * Finds a suitable partner for a human, based on age and gender.
   * @private
   * @param {Man | Woman} human - The human looking for a partner.
   * @returns {Man | Woman | null} - A suitable partner or null if none is found.
   */
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

  /**
   * Simulates the birth of one or more children by a woman.
   * @private
   * @param {Woman} human - The woman giving birth.
   * @param {number} quantity - The number of children to be born.
   */
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

  /**
   * Determines if a woman will give birth based on probability and the number of existing children.
   * @private
   * @param {number} probability - The probability of giving birth.
   * @param {number} childrenQuantity - The number of existing children.
   * @returns {boolean} - True if the woman will give birth, false if not.
   */
  private willBorn(probability: number, childrenQuantity: number): boolean {
    return (
      (probability <= 0.85 && childrenQuantity === 0) ||
      (probability <= 0.5 && childrenQuantity === 1) ||
      (probability <= 0.2 && childrenQuantity === 2) ||
      probability <= 0.1
    );
  }

  /**
   * Attempts to give birth to children by a woman based on probability.
   * @private
   * @param {Woman} human - The woman trying to give birth.
   */
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

  /**
   * Calculates statistics about the people in the world, including the count of males, females, and children.
   * @private
   * @returns {Object} - Object containing calculated statistics.
   */
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

  /**
   * Checks if a woman is eligible to give birth based on age and other conditions.
   * @private
   * @param {Woman} female - The woman to check for eligibility.
   * @returns {boolean} - True if the woman is eligible to give birth, false otherwise.
   */
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

  /**
   * Chooses a random profession from the available professions.
   * @private
   * @param {string[]} array - The array of available professions.
   * @returns {string} - The randomly selected profession.
   */
  private chooseRandomProfession(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generates a random profession for an 18-year-old human.
   * @private
   * @returns {string} - The generated profession.
   */
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

  /**
   * Selects a random cataclysm event based on probabilities.
   * @private
   * @returns {TCataclysm | null} - The selected cataclysm event or null if none are selected.
   */
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

  /**
   * Simulates human deaths due to extreme temperatures.
   * @private
   */
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
