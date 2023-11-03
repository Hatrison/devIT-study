import { BOYS_NAMES, GIRLS_NAMES } from './constants.ts';

export class Human {
  /**
   * Create a Human.
   * @constructor
   * @param {string} name - The name of the human.
   * @param {string} surname - The surname of the human.
   * @param {number} age - The age of the human.
   * @param {string} eyes - The color of the human eyes.
   * @param {string} hair - The color of the human's hair.
   * @param {string} skin - The color of the human's skin.
   * @param {string} bodyType - The body type of the human.
   * @param {number} maxHeight - The maximum height of the human.
   * @param {number} maxWeight - The maximum weight of the human.
   * @param {number} height - The current height of the human.
   * @param {number} weight - The current weight of the human.
   * @param {Man | Woman | any} partner - The partner of the human.
   * @param {Human[]} parents - The parents of the human.
   * @param {Human[]} children - The children of the human.
   * @param {string} profession - The profession of the human.
   */
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

  /**
   * Checks if a human can create a pair with another human.
   * @protected
   * @param {Human} human - The other human to check compatibility with.
   * @returns {boolean} - True if a pair can be created, false if not.
   */
  protected canCreatePair(human: Human): boolean {
    return (
      this.age >= 18 && human.age >= 18 && Math.abs(this.age - human.age) <= 5
    );
  }

  /**
   * Creates a pair with another human if possible.
   * @param {Human} human - The other human to create a pair with.
   * @returns {boolean} - True if a pair is created, false if not.
   */
  public createPair(human: Human): boolean {
    if (this.canCreatePair(human)) {
      this.partner = human;
      human.partner = this;

      return true;
    }
    return false;
  }

  /**
   * Checks if the human is alive (age is less than or equal to 85).
   * @returns {boolean} - True if the human is alive, false if not.
   */
  public isAlive(): boolean {
    return this.age <= 85;
  }

  /**
   * Checks if a human is a brother or sister of the current human (incest).
   * @param {Human} human - The human to check for incest.
   * @returns {boolean} - True if the specified human is a brother or sister, false if not.
   */
  public isIncest(human: Human): boolean {
    return this.parents[0]?.children.includes(human);
  }

  /**
   * Increases height and weight of the human based on age.
   */
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
  /**
   * The gender of the human (always 'male').
   */
  public gender: string;

  /**
   * Create a Man.
   * @constructor
   * @param {...any} args - Arguments passed to the constructor of the base Human class.
   */
  constructor(...args: any[]) {
    super(...args);
    this.gender = 'male';
  }

  /**
   * Overrides the createPair method to set the partner's surname.
   * @param {Human} human - The other human to create a pair with.
   * @returns {boolean} - True if a pair is created, false if not.
   */
  public createPair(human: Human): boolean {
    const result: boolean = super.createPair(human);
    if (result) this.partner.surname = this.surname;

    return result;
  }
}

export class Woman extends Human {
  /**
   * The gender of the human (always 'female').
   */
  public gender: string;
  /**
   * Indicates if a woman can give birth (always false by default).
   */
  public canBorn: boolean;

  /**
   * Create a Woman.
   * @constructor
   * @param {...any} args - Arguments passed to the constructor of the base Human class.
   */
  constructor(...args: any[]) {
    super(...args);
    this.gender = 'female';
    this.canBorn = false;
  }

  /**
   * Overrides the createPair method to set the woman's surname.
   * @param {Human} human - The other human to create a pair with.
   * @returns {boolean} - True if a pair is created, false otherwise.
   */
  public createPair(human: Human): boolean {
    const result: boolean = super.createPair(human);
    if (result) this.surname = this.partner.surname;
    return result;
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
