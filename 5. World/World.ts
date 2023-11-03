import { Human } from './humans/Human.ts';
import { Man } from './humans/Man.ts';
import { Woman } from './humans/Woman.ts';
import { PROFESSIONS } from './constants.ts';
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

        this.deathDueToTemperature();

        if (!human.isAlive()) {
          this.people.splice(this.people.indexOf(human), 1);
          this.stats.died++;
        }

        human.createPair(this.people as Human[]);

        human.updateAbilityToBorn();

        human.born().then((children: (Man | Woman)[] | null) => {
          if (!children) return;
          this.stats.born += children.length;
          this.people = this.people.concat(children);
        });
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
   * Calculates statistics about the people in the world, including the count of males, females, and children.
   * @private
   * @returns {Object} - Object containing calculated statistics.
   */
  private calculatePeople(): Object {
    const children: number = this.people.filter(
      (human: Man | Woman): boolean => human.age < 18
    ).length;

    const males: number = this.people.filter(
      (human: Man | Woman): boolean => human instanceof Man
    ).length;

    const females: number = this.people.length - males;

    return { males, females, children };
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
      .filter((human: Man | Woman) =>
        uniqueProfessions.includes((human.profession as string)?.toLowerCase())
      )
      .map((human: Man | Woman) => human.profession as string);

    return this.chooseRandomProfession(
      PROFESSIONS.filter(
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
      (probability <= 0.2 && this.temperature >= 60) ||
      (probability <= 0.05 && this.temperature >= 40) ||
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
