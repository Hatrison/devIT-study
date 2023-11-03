import { BOYS_NAMES, GIRLS_NAMES } from '../constants.ts';
import { Human } from './Human.ts';
import { Man } from './Man.ts';

export class Woman extends Human {
  /**
   * The gender of the human (always 'female').
   */
  public gender: string;
  /**
   * Indicates if a woman can give birth (always false by default).
   */
  public abilityToBorn: boolean;

  /**
   * Indicates if there is a delay after giving birth (always false by default).
   */
  public hasDelayAfterBirth: boolean = false;

  /**
   * Create a Woman.
   * @constructor
   * @param {...any} args - Arguments passed to the constructor of the base Human class.
   */
  constructor(...args: any[]) {
    super(...args);
    this.gender = 'female';
    this.abilityToBorn = false;
  }

  /**
   * Overrides the createPair method to set the woman's surname.
   * @param {Human[]} humans - An array of humans to find a partner from.
   * @returns {boolean} - True if a pair is created, false otherwise.
   */
  public createPair(humans: Human[]): boolean {
    const isPairCreated: boolean = super.createPair(humans);
    if (isPairCreated) this.surname = this.partner.surname;

    return isPairCreated;
  }

  /**
   * Updates the ability to give birth based on age.
   */
  public updateAbilityToBorn(): void {
    if (this.age >= 18 && this.age <= 40 && !this.hasDelayAfterBirth) {
      this.abilityToBorn = true;
    }
  }

  /**
   * Asynchronously gives birth to a number of children based on age and probability.
   * @returns {Promise<(Man | Woman)[] | null>} - An array of children born or null if no children are born.
   */
  public async born(): Promise<(Man | Woman)[] | null> {
    if (!this.canBorn()) return null;
    const childrenQuantity: number = this.children.length;
    const probability: number = Math.random();

    let bornQuantity: number = 1;
    const bornProbability: number = Math.random();
    if (bornProbability <= 0.1) {
      bornQuantity = 2;
    } else if (bornProbability <= 0.05) {
      bornQuantity = 3;
    }

    if (this.willGiveBirth(probability, childrenQuantity)) {
      return await this.giveBirthToChildren(bornQuantity);
    }

    return null;
  }

  /**
   * Checks if the woman can give birth.
   * @returns {boolean} - True if the woman can give birth, false if not.
   */
  private canBorn(): boolean {
    return this.abilityToBorn && this.partner && this.children.length < 5;
  }

  /**
   * Determines if a woman will give birth based on age and probability.
   * @param {number} probability - A random probability value.
   * @param {number} childrenQuantity - The number of children the woman already has.
   * @returns {boolean} - True if the woman will give birth, false if not.
   */
  private willGiveBirth(
    probability: number,
    childrenQuantity: number
  ): boolean {
    return (
      (probability <= 0.85 && childrenQuantity === 0) ||
      (probability <= 0.5 && childrenQuantity === 1) ||
      (probability <= 0.2 && childrenQuantity === 2) ||
      probability <= 0.1
    );
  }

  /**
   * Gives birth to a specified number of children, updating the delay after birth.
   * @param {number} quantity - The number of children to give birth to.
   * @returns {Promise<(Man | Woman)[]>} - A promise that resolves with an array of children born.
   */
  private giveBirthToChildren(quantity: number): Promise<(Man | Woman)[]> {
    return new Promise(resolve => {
      const children: (Man | Woman)[] = [];
      this.hasDelayAfterBirth = true;
      this.abilityToBorn = false;

      setTimeout((): void => {
        for (let i = 1; i <= quantity; i++) {
          const child: Man | Woman = this.bornChild();
          children.push(child);
        }
        resolve(children);

        setTimeout((): void => {
          this.hasDelayAfterBirth = false;
        }, 2000);
      }, 1000);
    });
  }

  /**
   * Generates a child based on the partners' characteristics.
   * @returns {Man | Woman} - The child born.
   */
  public bornChild(): Man | Woman {
    const gender = this.randomGender();
    const name =
      gender === 'male'
        ? this.chooseRandomName(BOYS_NAMES)
        : this.chooseRandomName(GIRLS_NAMES);
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

  /**
   * Chooses a random name from an array of names.
   * @param {string[]} array - The array of names to choose from.
   * @returns {string} - The randomly selected name.
   */
  private chooseRandomName(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generates a random gender ('male' or 'female').
   * @protected
   * @returns {'male' | 'female'} - The randomly generated gender.
   */
  protected randomGender(): 'male' | 'female' {
    return Math.random() < 0.5 ? 'male' : 'female';
  }

  /**
   * Generates the eye color of the child based on the parents' eye colors.
   * @param {Man} partner - The partner (father) of the child.
   * @returns {string} - The generated eye color.
   */
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

  /**
   * Generates a child's property based on the parents' property.
   * @param {string} property - The property to generate.
   * @param {Human} partner - The partner (parent) to base the property on.
   * @returns {string} - The generated property color.
   */
  protected generateProperty(property: string, partner: Human): string {
    if (this[property as keyof Human] === partner[property as keyof Human]) {
      return this[property as keyof Human] as string;
    } else {
      return Math.random() < 0.5
        ? (this[property as keyof Human] as string)
        : (partner[property as keyof Human] as string);
    }
  }

  /**
   * Generates an average value for the child's maximum height or weight.
   * @param {'maxHeight' | 'maxWeight'} property - The property to generate (maxHeight or maxWeight).
   * @param {Human} partner - The partner (parent) to base the property on.
   * @param {string} gender - The gender of the child.
   * @returns {number} - The generated property value.
   */
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
